const app = Vue.createApp({
    data() {
        return {
          warriorHealth: 100,
          dragonHealth: 100,
          numOfSpecialAttack: 3,
          numOfHeal: 3,
          winner: null,
          battleLogMessages: [],
        };
      },
      watch: {
        warriorHealth(value) {
          if (value <= 0 && this.dragonHealth <= 0) {
            //draw
            this.winner = "draw";
          } else if (value <= 0) {
            this.winner = "dragon";
          }
        },
        dragonHealth(value) {
          if (value <= 0 && this.warriorHealth <= 0) {
            //draw
            this.winner = "draw";
          } else if (value <= 0) {
            this.winner = "warrior";
          }
        }
      },
      computed: {
        warriorHealthBar() {
          if (this.warriorHealth < 0) {
            return { width: "0%" };
          } else {
            if (this.warriorHealth <= 50) {
              return { width: this.warriorHealth + "%", background: "red" };
            } else {
              return { width: this.warriorHealth + "%" };
            }
          }
        },
        dragonHealthBar() {
          if (this.dragonHealth < 0) {
            return { width: "0%" };
          } else {
            if (this.dragonHealth <= 50) {
              return { width: this.dragonHealth + "%", background: "red" };
            } else {
              return { width: this.dragonHealth + "%" };
            }
          }
        }
      },
      methods: {
        startFight() {
          this.warriorHealth = 100;
          this.dragonHealth = 100;
          this.numOfSpecialAttack = 3;
          this.numOfHeal = 3;
          this.winner = null;
          this.battleLogMessages = [];
        },
        attackDragon() {
          const attackDamage = getRandomValue(6, 15);
          // check if dragon health is greater than zero first
          if (this.dragonHealth - attackDamage < 0) {
            this.dragonHealth = 0;
          } else {
            this.dragonHealth -= attackDamage;
          }
          
          this.addBattleLog("warrior", "attack", attackDamage);
          this.attackWarrior();
        },
        attackWarrior() {
          const attackDamage = getRandomValue(8, 20);
          if (this.warriorHealth - attackDamage < 0) {
            this.warriorHealth = 0;
          } else {
            this.warriorHealth -= attackDamage;
          }
    
          this.addBattleLog("dragon", "attack", attackDamage);
        },
        specialAttack() {
          this.numOfSpecialAttack--;
          const attackDamage = getRandomValue(10, 25);
          if (this.dragonHealth - attackDamage < 0) {
            this.dragonHealth = 0;
          } else {
            
            this.dragonHealth -= attackDamage;
          }
          this.addBattleLog("warrior", "special-attack", attackDamage);
          this.attackWarrior();
        },
        heal() {
          this.numOfHeal--;
          const healValue = getRandomValue(10, 25);
          if (this.warriorHealth + healValue > 100) {
            this.warriorHealth = 100;
          } else {
            this.warriorHealth += healValue;
          }
          this.addBattleLog("warrior", "heal", healValue);
          this.attackWarrior();
        },
        forfeit() {
          this.winner = "dragon";
        },
        addBattleLog(who, what, value) {
          this.battleLogMessages.unshift({
            attacker: who,
            actionType: what,
            actionValue: value
          });
        }
      }
    
    });
    app.mount('#monApp');



