var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        creep.memory.building = false;

	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

        var targetStorage = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER) && 
                        structure.store.getUsedCapacity(RESOURCE_ENERGY) >= 500;
                        // Insert minimum threshold to allows utilities to repair objects.
            }
        });

        targetStorage.sort((a,b) => b.store.getUsedCapacity(RESOURCE_ENERGY) - a.store.getUsedCapacity(RESOURCE_ENERGY));

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length > 0) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else {
                creep.memory.building = false;
            }
	    }
	    else {
	        var sources = creep.room.find(FIND_SOURCES);
	        /* var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER) && 
                                structure.store.getUsedCapacity(RESOURCE_ENERGY) >= 500;
                                // Insert minimum threshold to allows utilities to repair objects.
                    }
            }); */
            // console.log('Builder resource structure list: ' + targets.length);
            if(targetStorage.length > 0) {
                if(creep.withdraw(targetStorage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targetStorage[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else {
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
	    }

        if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            var lowestTargetStorage = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER) && 
                            structure.store.getUsedCapacity(RESOURCE_ENERGY) >= 0;
                            // Insert minimum threshold to allows utilities to repair objects.
                }
            });

            lowestTargetStorage.sort((a,b) => a.store.getUsedCapacity(RESOURCE_ENERGY) - b.store.getUsedCapacity(RESOURCE_ENERGY));

            if (lowestTargetStorage.length > 0) {
                if(creep.transfer(lowestTargetStorage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(lowestTargetStorage[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }

        // Experimental, getting tired of these useless sods just standing there if there aren't any pending construction sites.
        /* if (targets.length == 0 && !creep.memory.building) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_CONTAINER ||
                            structure.structureType == STRUCTURE_TOWER) && 
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });

            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        } */
	}
};

module.exports = roleBuilder;