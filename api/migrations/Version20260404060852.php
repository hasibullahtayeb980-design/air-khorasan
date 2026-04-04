<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260404060852 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE commission (id INT AUTO_INCREMENT NOT NULL, partner_company VARCHAR(255) NOT NULL, amount INT NOT NULL, date DATETIME NOT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE customer (id INT AUTO_INCREMENT NOT NULL, full_name VARCHAR(255) NOT NULL, phone VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, passport_number INT NOT NULL, tazkira_number INT NOT NULL, created_at DATETIME NOT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE expense (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(255) NOT NULL, amount INT NOT NULL, category INT NOT NULL, date DATETIME NOT NULL, description VARCHAR(255) NOT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE ticket (id INT AUTO_INCREMENT NOT NULL, ticket_number INT NOT NULL, airline VARCHAR(255) NOT NULL, from_city VARCHAR(255) NOT NULL, to_city VARCHAR(255) NOT NULL, departure_date DATETIME NOT NULL, return_date DATETIME NOT NULL, price INT NOT NULL, status INT NOT NULL, created_at DATETIME NOT NULL, customer_id INT NOT NULL, INDEX IDX_97A0ADA39395C3F3 (customer_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE ticket_cancellation (id INT AUTO_INCREMENT NOT NULL, cancellation_date DATETIME NOT NULL, refund_amount INT NOT NULL, penalty INT NOT NULL, ticket_id INT NOT NULL, UNIQUE INDEX UNIQ_3B18A1A7700047D2 (ticket_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE ticket_change (id INT AUTO_INCREMENT NOT NULL, change_type INT NOT NULL, old_date DATETIME NOT NULL, new_date DATETIME NOT NULL, fee INT NOT NULL, created_at DATETIME NOT NULL, ticket_id INT NOT NULL, INDEX IDX_3A1594EB700047D2 (ticket_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE visa (id INT AUTO_INCREMENT NOT NULL, country VARCHAR(255) NOT NULL, visa_type INT NOT NULL, application_date DATETIME NOT NULL, status INT NOT NULL, fee INT NOT NULL, company_cost INT NOT NULL, profit INT NOT NULL, customer_id INT NOT NULL, commission_id INT DEFAULT NULL, INDEX IDX_16B1AB089395C3F3 (customer_id), INDEX IDX_16B1AB08202D1EB2 (commission_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('ALTER TABLE ticket ADD CONSTRAINT FK_97A0ADA39395C3F3 FOREIGN KEY (customer_id) REFERENCES customer (id)');
        $this->addSql('ALTER TABLE ticket_cancellation ADD CONSTRAINT FK_3B18A1A7700047D2 FOREIGN KEY (ticket_id) REFERENCES ticket (id)');
        $this->addSql('ALTER TABLE ticket_change ADD CONSTRAINT FK_3A1594EB700047D2 FOREIGN KEY (ticket_id) REFERENCES ticket (id)');
        $this->addSql('ALTER TABLE visa ADD CONSTRAINT FK_16B1AB089395C3F3 FOREIGN KEY (customer_id) REFERENCES customer (id)');
        $this->addSql('ALTER TABLE visa ADD CONSTRAINT FK_16B1AB08202D1EB2 FOREIGN KEY (commission_id) REFERENCES commission (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE ticket DROP FOREIGN KEY FK_97A0ADA39395C3F3');
        $this->addSql('ALTER TABLE ticket_cancellation DROP FOREIGN KEY FK_3B18A1A7700047D2');
        $this->addSql('ALTER TABLE ticket_change DROP FOREIGN KEY FK_3A1594EB700047D2');
        $this->addSql('ALTER TABLE visa DROP FOREIGN KEY FK_16B1AB089395C3F3');
        $this->addSql('ALTER TABLE visa DROP FOREIGN KEY FK_16B1AB08202D1EB2');
        $this->addSql('DROP TABLE commission');
        $this->addSql('DROP TABLE customer');
        $this->addSql('DROP TABLE expense');
        $this->addSql('DROP TABLE ticket');
        $this->addSql('DROP TABLE ticket_cancellation');
        $this->addSql('DROP TABLE ticket_change');
        $this->addSql('DROP TABLE visa');
    }
}
