const DrawCard = require('../../drawcard.js');

class SerPounce extends DrawCard {
    setupCardAbilities(ability) {
        this.attachmentRestriction(card => card.getType() === 'character' && card.isUnique() && card.getPrintedCost() <= 3);
        this.whileAttached({
            effect: ability.effects.addIcon('intrigue')
        });
        this.whileAttached({
            condition: () => this.game.isDuringChallenge({ challengeType: 'intrigue' }),
            effect: ability.effects.doesNotKneelAsAttacker()
        });
    }
}

SerPounce.code = '08090';

module.exports = SerPounce;
