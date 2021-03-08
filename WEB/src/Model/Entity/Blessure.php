<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * Blessure Entity
 *
 * @property int $id
 * @property int $user_id
 * @property int $blessure_pathologie_id
 * @property \Cake\I18n\FrozenDate $date
 * @property bool $operation
 * @property bool $is_active
 * @property \Cake\I18n\FrozenTime|null $created
 * @property \Cake\I18n\FrozenTime|null $modified
 *
 * @property \App\Model\Entity\BlessurePathology $blessure_pathology
 */
class Blessure extends Entity
{
    /**
     * Fields that can be mass assigned using newEntity() or patchEntity().
     *
     * Note that when '*' is set to true, this allows all unspecified fields to
     * be mass assigned. For security purposes, it is advised to set '*' to false
     * (or remove it), and explicitly make individual fields accessible as needed.
     *
     * @var array
     */
    protected $_accessible = [
        'user_id' => true,
        'blessure_pathologie_id' => true,
        'date' => true,
        'operation' => true,
        'is_active' => true,
        'created' => true,
        'modified' => true,
        'blessure_pathology' => true
    ];
}
