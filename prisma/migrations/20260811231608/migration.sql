-- CreateTable
CREATE TABLE `Products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bar_code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `qtd` INTEGER NOT NULL,
    `price` INTEGER NOT NULL,
    `type` ENUM('ROUPAS', 'ACESSÓRIOS', 'CASA') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
