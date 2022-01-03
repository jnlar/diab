<?php

namespace App\Repository;

use App\Entity\Reading;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\QueryBuilder;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Reading|null find($id, $lockMode = null, $lockVersion = null)
 * @method Reading|null findOneBy(array $criteria, array $orderBy = null)
 * @method Reading[]    findAll()
 * @method Reading[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ReadingRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Reading::class);
    }

    /**
     * findAll() doesn't sort by DESC
     * @return array
     */
    public function getReadingsDesc(): array
    {
      $queryBuilder = $this->createQueryBuilder('r')
        ->orderBy('r.date', 'DESC');

      $query = $queryBuilder->getQuery();

      return $query->execute();
    }

    // /**
    //  * @return Reading[] Returns an array of Reading objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('r.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Reading
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
