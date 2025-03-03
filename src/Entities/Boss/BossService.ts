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
import { ScreenDashboard } from "../../ScreenDashboard";

export class BossService extends EmmitiveService {
  boss: Boss | undefined;
  constructor(
    private readonly app: Application<Renderer>,
    private readonly entityManager: EntityManager,
    private readonly bulletService: BulletService,
    private readonly timerService: TimerService,
    private readonly screenDashboard: ScreenDashboard,
    private readonly bossFactory: BossFactory = new BossFactory(app),
  ) {
    super();

    this.timerService.doEvery(() => {
      this.shot();
    }, BossData.shotFrequency);
  }

  public update() {
    if (!this.boss) {
      this.getBoss();
    } else {
      if (this.boss.isActive) this.boss.move();
    }

    this.checkDamage();
  }

  checkDamage() {
    if (!this.boss) return;

    if (this.boss.health <= 0) {
      this.boss.dead();
      this.boss.removeFromStage();
    }

    for (let entity of this.entityManager.getEntities()) {
      if (entity instanceof Bullet && entity.ownerType === EntityTypes.HERO) {
        if (
          this.boss &&
          Physics.checkRectangleCircleCollision(this.boss, entity)
        ) {
          if (this.boss.health > 0) this.boss.damage();

          this.screenDashboard.addBosHealthText(`Health ${this.boss.health}`);

          entity.removeFromStage();
          this.entityManager.removeEntityById(entity.id);
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
