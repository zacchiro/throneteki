const DrawCard = require('../../drawcard.js');

class TakeTheBlack extends DrawCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Take control of character',
            max: ability.limit.perRound(1),
            phase: 'dominance',
            target: {
                cardCondition: card => this.cardCondition(card)
            },
            handler: context => {
                this.game.takeControl(context.player, context.target);
                this.game.addMessage('{0} plays {1} to take control of {2}', context.player, this, context.target);
            }
        });
    }

    cardCondition(card) {
        return card.controller !== this.controller && card.getType() === 'character' && !card.isUnique() && card.getPrintedCost() <= 6;
    }
}

TakeTheBlack.code = '01139';

module.exports = TakeTheBlack;
