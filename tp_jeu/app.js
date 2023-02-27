const app = Vue.createApp({
    data() {
        return {
            playerName:'Samus',
            enemyName:'Monstre',
            playerLife:100,
            enemyLife:100,
            playerDamage:0,
            enemyDamage:0,
            counterRound:0,
            winner:null,
            logs: [],
            nbSpecial:2,
            nbHeathCare:3,
        };
    },
    computed: {
        playerHealthBar() {
            if (this.playerLife<=0) {
                return {width: "0%"};
            } else if (this.playerLife<=33) {
                return {width: this.playerLife + '%', backgroundColor: "red"};
            } else if (this.playerLife<=66) {
                return {width: this.playerLife + '%', backgroundColor: "orange"};
            } else {
                return {width: this.playerLife + '%', backgroundColor: "green"};
            }
        },
        enemyHealthBar() {
            if (this.enemyLife<=0) {
                return {width: "0%"};
            } else if (this.enemyLife<=33) {
                return {width: this.enemyLife + '%', backgroundColor: "red"};
            } else if (this.enemyLife<=66) {
                return {width: this.enemyLife + '%', backgroundColor: "orange"};
            } else {
                return {width: this.enemyLife + '%', backgroundColor: "green"};
            }
        },
    },
    methods: {
        startFight() {
            this.playerLife=100;
            this.enemyLife=100;
            this.nbSpecial=2;
            this.winner=null;
            this.logs=[];
            this.nbHeathCare=3;
        },
        playerAttack() {
            this.counterRound ++;
            this.playerDamage = Math.round((Math.random() * (20 - 5) + 5));
            this.enemyLife -= this.playerDamage;
            this.addLog(this.playerName,"attack",this.playerDamage);
            this.enemyAttack();
        },
        enemyAttack() {
            this.counterRound++;
            this.enemyDamage = Math.round(this.playerDamage + (Math.random() * (5 - 1) + 1));
            this.playerLife -= this.enemyDamage;
            this.addLog(this.enemyName,"attack",this.enemyDamage);
        },
        specialAttack() {
            this.counterRound++;
            this.enemyLife -= 25;
            this.nbSpecial--;
            this.addLog(this.playerName,"special-attack",25);
            this.enemyAttack();
        },
        healthCare() {
            this.counterRound ++;
            this.playerLife += 25;
            this.nbHeathCare--;
            if (this.playerLife > 100) {
                this.playerLife = 100;
            } 
            this.addLog(this.playerName,"health",'25');
            this.enemyAttack();
        },
        giveUp() {
            this.winner = this.enemyName;
        },
        addLog(who,what,value) {
            if (what==='attack') {
                this.logs.unshift(who + " attaque et inflige " + value + " dégats!");
            } else if (what==='special-attack') {
                this.logs.unshift(who + " utilise son attaque spéciale et inflige " + value + " dégats!");
            } else {
                this.logs.unshift(who + " utilise soin et récupère " + value + " points de vie!");
            }
        }
    },
    watch: {
        playerLife(value) {
            if (value <= 0 && this.enemyLife <=0) {
                this.winner='none';
            } else if (value <= 0){
                this.winner= this.enemyName;
            }
        },
        enemyLife(value) {
            if (value <= 0 && this.playerLife <=0) {
                this.winner='none';
            } else if (value <= 0){
                this.winner= this.playerName;
            }
        }
    }
    });
    app.mount('#AppCombat');