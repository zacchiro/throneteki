const _ = require('underscore');

const DrawCard = require('../../drawcard.js');

class Craster extends DrawCard {
    constructor(owner, cardData) {
        super(owner, cardData);
        this.tracker = new KillTracker(this.game);
    }

    setupCardAbilities(ability) {
        this.persistentEffect({
            match: this,
            effect: ability.effects.immuneTo(card => card.hasTrait('Omen'))
        });
        this.action({
            title: 'Sacrifice to resurrect',
            cost: ability.costs.sacrificeSelf(),
            condition: () => this.tracker.anyKilled(),
            handler: context => {
                let characters = this.tracker.killedThisPhase.filter(card => card.location === 'dead pile');
                _.each(characters, character => {
                    character.owner.putIntoPlay(character);
                });
                this.game.addMessage('{0} sacrifices {1} to put into play each character killed this phase', context.player, this);
            }
        });
    }
}

class KillTracker {
    constructor(game) {
        this.killedThisPhase = [];
        game.on('onCharacterKilled', event => this.killedThisPhase.push(event.card));
        game.on('onPhaseStarted', () => this.killedThisPhase = []);
    }

    anyKilled() {
        return this.killedThisPhase.length !== 0;
    }
}

Craster.code = '04085';

module.exports = Craster;
