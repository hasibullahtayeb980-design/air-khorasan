<?php

namespace App\DataFixtures;

use DateTimeImmutable;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Uid\Uuid;
use App\Entity\Customer;
use App\Entity\Ticket;
use App\Entity\TicketChange;
use App\Entity\TicketCancellation;
use App\Entity\Visa;
use App\Entity\Commission;
use App\Entity\Expense;
use App\Repository\TicketRepository;
use DateTime;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = \Faker\Factory::create();

        for ($i = 0; $i < 2398; $i++) {
            $customer = new Customer();
            $customer->setFullName($faker->name);
            $customer->setPhone($faker->phoneNumber);
            $customer->setEmail($faker->email);
            $customer->setPassportNumber($faker->numberBetween(1000000, 9999999));
            $customer->setTazkiraNumber($faker->numberBetween(1000000, 9999999));
            $customer->setAvatarImageUrl("https://mockmind-api.uifaces.co/content/human/{$faker->numberBetween(0, 200)}.jpg");
            $customer->setCreatedAt(DateTimeImmutable::createFromMutable($faker->dateTimeBetween('-12 months', 'now')));
            $manager->persist($customer);
        }

        $manager->flush();

        $customers = $manager->getRepository(Customer::class)->findAll();
        $numberOfTickets = $faker->numberBetween(100, 500);

        for ($i = 0; $i < $numberOfTickets; $i++) {
            $ticket = new Ticket();
            $ticket->setCustomer($customers[array_rand($customers)]);
            $ticket->setTicketNumber($faker->numberBetween(100000, 999999));
            $ticket->setAirline($faker->company);
            $ticket->setFromCity($faker->city);
            $ticket->setToCity($faker->city);
            $ticket->setDepartureDate($faker->dateTimeBetween('now', '+1 month'));
            $ticket->setReturnDate($faker->dateTimeBetween('+1 month', '+2 months'));
            $ticket->setPrice($faker->numberBetween(100, 1000));
            $ticket->setStatus($faker->numberBetween(0, 2));
            $manager->persist($ticket);
        }

        $manager->flush();

        $tickets = $manager->getRepository(Ticket::class)->findAll();
        $numberOfTicketsChanged = $faker->numberBetween(10, 40);

        for ($i = 0; $i < $numberOfTicketsChanged; $i++) {
            $ticket = $tickets[array_rand($tickets)];
            $ticketChange = new TicketChange();
            $ticketChange->setTicket($ticket);
            $ticketChange->setChangeType($faker->numberBetween(0, 2));
            $ticketChange->setOldDate(DateTime::createFromImmutable($ticket->getCreatedAt()));
            $ticketChange->setNewDate($faker->dateTimeBetween('+1 month', '+2 months'));
            $ticketChange->setFee($faker->numberBetween(10, 100));
            $manager->persist($ticketChange);
        }

        $visas = [];

        for ($i = 0; $i < $faker->numberBetween(300, 500); $i++) {
            $fee = $faker->numberBetween(100, 1000);
            $companyCost = $faker->numberBetween(10, 50);
            
            $visa = new Visa();
            $visa->setCustomer($customers[array_rand($customers)]);
            $visa->setCountry($faker->country);
            $visa->setVisaType($faker->numberBetween(0, 2));
            $visa->setApplicationDate($faker->dateTimeBetween('-1 year', 'now'));
            $visa->setStatus($faker->numberBetween(0, 2));
            $visa->setFee($fee);
            $visa->setCompanyCost($companyCost);
            $visa->setProfit($fee - $companyCost);

            $manager->persist($visa);
            $visas[] = $visa;
        }

        $manager->flush();

        for ($i = 0; $i < $faker->numberBetween(100, 200); $i++) {
            $commission = new Commission();
            $commission->setPartnerCompany($faker->company());
            $commission->setVisa(array_pop($visas));
            $commission->setAmount($faker->numberBetween(10, 500));
            $commission->setDate($faker->dateTimeBetween('-1 year', 'now'));

            $manager->persist($commission);
        }

        $manager->flush();

        for ($i = 0; $i < $faker->numberBetween(100, 200); $i++) {
            $expense = new Expense();
            $expense->setTitle($faker->sentence(3));
            $expense->setAmount($faker->numberBetween(10, 500));
            $expense->setCategory($faker->numberBetween(0, 3));
            $expense->setDate($faker->dateTimeBetween('-1 year', 'now'));
            $expense->setDescription($faker->sentence());

            $manager->persist($expense);
        }

        $manager->flush();
        $numberOfTicketsCancelled = $faker->numberBetween(10, 40);

        for ($i = 0; $i < $numberOfTicketsCancelled; $i++) {
            $ticket = array_pop($tickets);
            $refundAmount = $faker->numberBetween(0, $ticket->getPrice());

            $ticketCancellation = new TicketCancellation();
            $ticketCancellation->setTicket($ticket);
            $ticketCancellation->setCancellationDate($faker->dateTimeBetween('now', '+1 month'));
            $ticketCancellation->setRefundAmount($refundAmount);
            $ticketCancellation->setPenalty($ticket->getPrice() - $refundAmount);
            $manager->persist($ticketCancellation);
        }

        $manager->flush();
    }
}