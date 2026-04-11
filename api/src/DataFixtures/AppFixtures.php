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
    private array $avatarImageUrls = [
        "https://t4.ftcdn.net/jpg/04/75/48/07/240_F_475480767_QE4tFThzSXlYbSPvui2pEvRjhHWVuQ0N.jpg",
        "https://t4.ftcdn.net/jpg/09/39/81/51/240_F_939815167_zabvF8PzPw5STDr1VlRO3Xcet81c3FpU.jpg",
        "https://t4.ftcdn.net/jpg/02/88/18/95/240_F_288189541_Mx8Etd1ePK3MwP4CBkwqo2Ktn6ehQM6c.jpg",
        "https://t3.ftcdn.net/jpg/08/60/88/76/240_F_860887660_BXg69SgK2JR5SZLeUj45sriCFhIDPqbw.jpg",
        "https://t3.ftcdn.net/jpg/07/15/84/82/240_F_715848208_m7UNtqgWWsvBkBiFgpojATvilXQFgLVV.jpg",
        "https://t4.ftcdn.net/jpg/10/85/74/31/240_F_1085743146_1w6kT1fzlRwl72S5C7FDHmqBaFdm97Ft.jpg",
        "https://t4.ftcdn.net/jpg/13/63/27/31/240_F_1363273157_biCVqVT7hUmaUCdcs3KdCPNw8j2XWP5L.jpg",
        "https://t3.ftcdn.net/jpg/16/12/60/28/240_F_1612602819_0d1pnm2GwQGjiQcNZnzzXDIOQ0NqTjS9.jpg",
    ];

    private array $firstNames = [
        "Abdul-Alim",
        "Abdul-Ali",
        "Abdul-Azim",
        "Abdul-Aziz",
        "Belal",
        "Basim",
        "Baktash",
        "Bahram",
        "Dastgir",
        "Dawood",
        "Dost Muhammad",
        "Elias",
        "Esmail",
        "Ehsan",
        "Ebrahim",
        "Edris",
        "Faizudin",
        "Faisal",
        "Farhad",
        "Fawad",
        "Ghani",
        "Habibullah",
        "Hasibullah",
        "Hamza",
        "Husain",
        "Ibrahim",
        "Idris",
        "Ismail",
        "Ishaq",
        "Javid",
        "Jalil",
        "Jawad",
        "Khalil",
        "Mahboob",
        "Mahmoud",
        "Najibullah",
        "Nasir",
        "Obaid",
        "Omar",
        "Payman",
        "Qais",
        "Ramesh",
        "Sayed",
        "Sohail",
        "Sohrab",
        "Sulaiman",
        "Tareq",
        "Usman",
        "Ubaid",
        "Umar",
        "Vahid",
        "Wahid",
        "Yousuf",
        "Zabiullah",
        "Zakaria",
    ];

    private array $surnames = [
        "Mohammed",
        "Abdul",
        "Ghulam",
        "Sayed",
        "Haji",
        "Gul",
        "Noor",
        "Ali",
        "Abdullah",
        "Muhammad",
        "Ahmad",
        "Shir",
        "Sakhi",
        "Shah",
        "Khan",
        "Mir",
        "Juma",
        "Amir",
        "Sayyid",
        "Hussein",
        "Mullah",
        "Sultan",
        "Ghani",
        "Jan",
        "Qurban",
        "Mirza",
        "Nazar",
        "Wali",
        "Fazal",
    ];

    public function load(ObjectManager $manager): void
    {
        $faker = \Faker\Factory::create();

        for ($i = 0; $i < 2398; $i++) {
            $customer = new Customer();

            $firstName = $faker->randomElement($this->firstNames);
            $surname = $faker->randomElement($this->surnames);
            $customer->setFullName("{$firstName} {$surname}");

            $phone = "+93 7{$faker->randomNumber(2)} {$faker->randomNumber(2)} {$faker->randomNumber(2)} {$faker->randomNumber(2)}";
            $customer->setPhone($phone);

            $customer->setEmail($faker->email);

            $customer->setPassportNumber((string) $faker->numberBetween(10000000, 99999999));
            $customer->setTazkiraNumber((string) $faker->numberBetween(1000000000000, 9999999999999));

            $avatarImageUrl = $faker->randomElement($this->avatarImageUrls);
            $customer->setAvatarImageUrl("https://cdn-icons-png.flaticon.com/128/149/149071.png");

            $customer->setCreatedAt(DateTimeImmutable::createFromMutable($faker->dateTimeBetween('-12 months', '-1 month')));
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
