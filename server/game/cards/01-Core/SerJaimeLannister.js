const DrawCard = require('../../drawcard.js');

class SerJaimeLannister extends DrawCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            condition: () => this.game.isDuringChallenge({ challengeType: 'military' }),
            match: this,
            effect: [
                ability.effects.addKeyword('Renown'),
                ability.effects.doesNotKneelAsAttacker()
            ]
        });
    }
}

SerJaimeLannister.code = '01087';

module.exports = SerJaimeLannister;
