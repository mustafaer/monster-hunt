function initialState() {
    return {
        playerHealth: 100,
        monsterHealth: 100,
        logs: [],
        gameIsOn: false,
        gameOverST: false,
        attackGrade: 10,
        specialAttackGrade: 25,
        firstAidGrade: 20,
        monsterAttackGrade: 25,
        totalMonsterAttackPoint: 0,
        totalPlayerAttackPoint: 0,
        totalHealPoint: 0,
        logTexts: {
            attack: "PLAYER ATTACK :",
            specialAttack: "PLAYER ATTACK (SPECIAL) : ",
            monsterAttack: "MONSTER ATTACK : ",
            firstAid: "FIRST AID :",
            giveUp: "PLAYER GIVE UP!!!"
        },
    }
}

new Vue({
    el: "#app",
    data: function () {
        return initialState()
    },
    methods: {
        newGame: function () {
            this.resetWindow();

        },
        attack: function () {
            let point = Math.ceil(Math.random() * this.attackGrade);
            this.totalPlayerAttackPoint += point;
            this.monsterHealth -= point;
            this.addToLog({turn: "p", text: this.logTexts.attack + point});
            this.monsterAttack();
        },
        specialAttack: function () {
            let point = Math.ceil(Math.random() * this.specialAttackGrade);
            this.totalPlayerAttackPoint += point;
            this.monsterHealth -= point;
            this.addToLog({turn: "p", text: this.logTexts.specialAttack + point});
            this.monsterAttack();
        },
        firstAid: function () {
            let point = Math.ceil(Math.random() * this.firstAidGrade);
            this.totalHealPoint += point;
            this.playerHealth += point;
            this.addToLog({turn: "p", text: this.logTexts.firstAid + point});
            this.monsterAttack();
        },
        giveUp: function () {
            this.playerHealth = 0;
            this.addToLog({turn: "p", text: this.logTexts.giveUp});
        },
        monsterAttack: function () {
            let point = Math.ceil(Math.random() * this.monsterAttackGrade);
            this.totalMonsterAttackPoint += point;
            this.playerHealth -= point;
            this.addToLog({turn: "m", text: this.logTexts.monsterAttack + point});
        },
        addToLog: function (log) {
            this.logs.unshift(log);
        },
        resetWindow: function (){
            Object.assign(this.$data, {});
            Object.assign(this.$data, initialState());
            this.gameIsOn = true;
        }
    },
    watch: {
        playerHealth: function (value) {
            if (value <= 0) {
                this.gameOverST = true;
                if (confirm("GAME OVER. TRY AGAIN?")) {
                    this.playerHealth = 100;
                    this.monsterHealth = 100;
                    this.logs = [];
                } else {
                    this.playerHealth = 0;
                }
            } else if (value >= 100) {
                this.playerHealth = 100;
            }
        },
        monsterHealth: function (value) {
            if (value <= 0) {
                this.gameOverST = true;
                this.monsterHealth = 0;
                if (confirm("GAME OVER. TRY AGAIN?")) {
                    this.playerHealth = 100;
                    this.monsterHealth = 100;
                    this.logs = [];
                } else {
                    this.monsterHealth = 0;
                }
            }
        }
    },
    computed: {
        playerHealthProgress: function () {
            return {
                width: this.playerHealth + "%"
            };
        },
        monsterHealthProgress: function () {
            return {
                width: this.monsterHealth + "%"
            };
        }
    }
});
