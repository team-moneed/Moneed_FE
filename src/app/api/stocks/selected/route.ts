import { TOKEN_ERROR } from '@/constants/token';
import { getSession } from '@/lib/session';
import { StockService } from '@/services/stock.service';
import { JWTExpired } from 'jose/errors';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: TOKEN_ERROR.INVALID_TOKEN }, { status: 401 });
        }

        const stockService = new StockService();
        const selectedStocks = await stockService.getSelectedStock(session.userId);

        return NextResponse.json(selectedStocks);
    } catch (error) {
        if (error instanceof JWTExpired) {
            return NextResponse.json({ error: TOKEN_ERROR.EXPIRED_TOKEN }, { status: 401 });
        }
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
