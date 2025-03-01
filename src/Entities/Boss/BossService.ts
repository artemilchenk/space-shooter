import { EntityManager } from "../../EntityManager";
import { Application, Renderer } from "pixi.js";
import BossFactory from "./BossFactory";
import { Boss } from "./Boss";
import { EmmitiveService } from "../EmmitiveService";
import { BulletService } from "../Bullet/BulletService";
import { TimerService } from "../../Timer/TimerService";
import { BossData } from "../../Constants";
import { Bullet } from "../Bullet/Bullet";
import { EntityTypes } from "../../Enums";
import { Physics } from "../../Physics";

export class BossService extends EmmitiveService {
  boss: Boss | undefined;
  constructor(
    private readonly app: Application<Renderer>,
    private readonly entityManager: EntityManager,
    private readonly bulletService: BulletService,
    private readonly timerService: TimerService,
    private readonly bossFactory: BossFactory = new BossFactory(app),
  ) {
    super();

    this.timerService.doEvery(() => {
      this.shot();
    }, BossData.shotFrequency);
  }

  public update() {
    if (!this.boss?.isActive) {
      this.getBoss();
    } else {
      this.boss.move();
    }

    this.checkDamage();
  }

  checkDamage() {
    if (!this.boss?.isActive) return;

    if (this.boss.health <= 0) {
      const boss = this.entityManager.getBoss();
      if (boss) {
        this.boss.dead();
        boss.isActive = false;
        boss.removeFromStage();
      }
    }

    for (let entity of this.entityManager.getEntities()) {
      if (entity instanceof Bullet && entity.ownerType === EntityTypes.HERO) {
        if (
          this.boss &&
          Physics.checkRectangleCircleCollision(this.boss, entity)
        ) {
          this.boss.health--;
          this.entityManager.removeEntity(entity);
        }
      }
    }
  }

  public createBoss() {
    const boss = this.bossFactory.createBoss();
    boss.movement.x = 1;

    this.entityManager.addEntity(boss);
  }

  private getBoss() {
    this.boss = this.entityManager
      .getEntities()
      .find((entity) => entity instanceof Boss);
  }

  public shot() {
    if (!this.boss?.isActive) return;
    this.bulletService.createBullet(this.boss, "red");
  }
}
