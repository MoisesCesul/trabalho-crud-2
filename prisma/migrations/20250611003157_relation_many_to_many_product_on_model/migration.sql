-- CreateTable
CREATE TABLE "_product_models" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_product_models_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_product_models_B_index" ON "_product_models"("B");

-- AddForeignKey
ALTER TABLE "_product_models" ADD CONSTRAINT "_product_models_A_fkey" FOREIGN KEY ("A") REFERENCES "models"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_product_models" ADD CONSTRAINT "_product_models_B_fkey" FOREIGN KEY ("B") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
