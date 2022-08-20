/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.utilities');
 * mod.thing == 'a thing'; // true
 */
var roleUtilities = { 

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.repairing = false;
            creep.memory.buildingToBeRepaired = null;
            //creep.say('Gathering');
	    }
	    if(!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {
	        creep.memory.repairing = true;
	        //creep.say('Repairing');
	    }
	    
	    if (!creep.memory.repairing) {
	        
	        var gatherTargets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER) && 
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) == 0;
                    }
            });
            
            if(gatherTargets.length > 0) {
                if(creep.withdraw(gatherTargets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(gatherTargets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
	    }
        if (creep.memory.repairing) {
            const targets = creep.room.find(FIND_STRUCTURES, {
                filter: object => object.hits < object.hitsMax
            });

            targets.sort((a,b) => a.hits - b.hits);

            if(targets.length > 0) {
                //console.log('Building: ' + targets[0] + ' / Status: ' + creep.repair(targets[0] == ERR_NOT_IN_RANGE));
                if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
            else {
                creep.memory.buildingToBeRepaired = null;
            }
        }
    }
};

module.exports = roleUtilities;