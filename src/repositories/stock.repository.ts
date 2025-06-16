import prisma from '@/lib/prisma';

export class StockRepository {
    private prisma = prisma;

    async getSelectedStock(userId: string) {
        return this.prisma.selectedStock.findMany({
            where: {
                userId,
            },
            include: {
                stock: {
                    select: {
                        name: true,
                    },
                },
            },
        });
    }

    async selectStock(userId: string, stockIds: number[]) {
        return this.prisma.selectedStock.createMany({
            data: stockIds.map(stockId => ({
                userId,
                stockId,
            })),
            skipDuplicates: true,
        });
    }
}
