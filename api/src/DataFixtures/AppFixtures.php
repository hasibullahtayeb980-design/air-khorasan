<?php

namespace App\DataFixtures;

use DateTimeImmutable;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Uid\Uuid;
use App\Entity\Customer;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = \Faker\Factory::create();

        for ($i = 0; $i < 100; $i++) {
            $customer = new Customer();
            $customer->setId(Uuid::v4());
            $customer->setFullName($faker->name);
            $customer->setPhone($faker->phoneNumber);
            $customer->setEmail($faker->email);
            $customer->setPassportNumber($faker->numberBetween(1000000, 9999999));
            $customer->setTazkiraNumber($faker->numberBetween(1000000, 9999999));
            $customer->setCreatedAt(DateTimeImmutable::createFromMutable($faker->dateTimeThisYear()));
            $manager->persist($customer);
        }

        $manager->flush();
    }
}
