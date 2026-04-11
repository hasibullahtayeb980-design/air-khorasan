<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260411104120 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE commission DROP FOREIGN KEY `FK_1C65015899C772A6`');
        $this->addSql('ALTER TABLE commission CHANGE visa_id visa_id INT NOT NULL');
        $this->addSql('ALTER TABLE commission ADD CONSTRAINT FK_1C65015899C772A6 FOREIGN KEY (visa_id) REFERENCES visa (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE visa DROP FOREIGN KEY `FK_16B1AB08202D1EB2`');
        $this->addSql('DROP INDEX IDX_16B1AB08202D1EB2 ON visa');
        $this->addSql('ALTER TABLE visa DROP commission_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE commission DROP FOREIGN KEY FK_1C65015899C772A6');
        $this->addSql('ALTER TABLE commission CHANGE visa_id visa_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE commission ADD CONSTRAINT `FK_1C65015899C772A6` FOREIGN KEY (visa_id) REFERENCES visa (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE visa ADD commission_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE visa ADD CONSTRAINT `FK_16B1AB08202D1EB2` FOREIGN KEY (commission_id) REFERENCES commission (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_16B1AB08202D1EB2 ON visa (commission_id)');
    }
}
