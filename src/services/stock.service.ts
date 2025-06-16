import { StockRepository } from '@/repositories/stock.repository';

export class StockService {
    private stockRepository: StockRepository;

    constructor() {
        this.stockRepository = new StockRepository();
    }

    async getSelectedStock(userId: string) {
        const selectedStocks = await this.stockRepository.getSelectedStock(userId);
        return selectedStocks.flatMap(stock => ({ ...stock, name: stock.stock.name }));
    }

    async selectStock(userId: string, stockIds: number[]) {
        await this.stockRepository.selectStock(userId, stockIds);
    }
}
