var roleBuilder = require('role.builder');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.store.getFreeCapacity() > 0) {
            var sources = creep.room.find(FIND_SOURCES);
             var assignedSource = creep.memory.sourceAssigned;
            if(creep.harvest(sources[assignedSource]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[assignedSource], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            const spawnTarget = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN) && 
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });

            const storageTarget = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_CONTAINER ||
                                structure.structureType == STRUCTURE_TOWER) && 
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            if(spawnTarget == null && storageTarget != null) {
                if(creep.transfer(storageTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storageTarget, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else {
                if(creep.transfer(spawnTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(spawnTarget, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            /* if(storageTarget != null){
                roleBuilder.run(creep);
            } */
        }
	}
};

module.exports = roleHarvester;