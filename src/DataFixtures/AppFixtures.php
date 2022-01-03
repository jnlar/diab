<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Reading;
use Faker\Factory;

class AppFixtures extends Fixture
{
  private $faker;

  public function __construct()
  {
    $this->faker = Factory::create();
  }

  public function load(ObjectManager $manager): void
  {
    for ($i = 0; $i < 50; $i++) {
      $manager->persist($this->createReading());
    }

    $manager->flush();
  }

  private function createReading(): Reading
  {
    return new Reading(
      $this->faker->randomFloat(),
      $this->faker->dateTime()
    );
  }
}
