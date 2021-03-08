<?php
namespace App\Model\Rule;

use Cake\ORM\TableRegistry;
use Cake\Datasource\EntityInterface;

class IsActive
{
    /**
     * Check if the current entity is active
     *
     * @param EntityInterface $entity
     * @param array $options
     *
     * @return bool
     */
    public function __invoke(EntityInterface $entity, array $options): bool
    {
        if (in_array($options['errorField'], $entity->getDirty())) {
            $entities = TableRegistry::get($options['Entity']);
            $newEntity = $entities->findById($entity->{$options['errorField']})->first();
            if (!empty($newEntity)) {
                if ($newEntity->is_active) {
                    return true;
                }
            }
            return false;
        }
        return true;
    }
}
