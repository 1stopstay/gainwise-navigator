import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, RefreshCcw } from "lucide-react";
import Navigation from "@/components/Navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ScannerData {
  exchange: string;
  tradingPair: string;
  high: number;
  low: number;
  last: number;
  near24hLow: number;
  spreadLvh: string;
  spreadCategory: string;
}

const mockData: ScannerData[] = [
  {
    exchange: "Binance",
    tradingPair: "1000CAT-TRY",
    high: 1.536,
    low: 1.071,
    last: 1.377,
    near24hLow: 28.6,
    spreadLvh: "43.4%",
    spreadCategory: ">20%"
  },
  {
    exchange: "Binance",
    tradingPair: "1000CAT-FDUSD",
    high: 0.04294,
    low: 0.03041,
    last: 0.03884,
    near24hLow: 27.7,
    spreadLvh: "41.2%",
    spreadCategory: ">20%"
  },
  // ... Add more mock data as needed
];

export default function CryptoScanner() {
  const [selectedExchange, setSelectedExchange] = useState<string>("all");
  const [selectedMarket, setSelectedMarket] = useState<string>("all");
  const [selectedSpread, setSelectedSpread] = useState<string>("all");
  const [selectedSort, setSelectedSort] = useState<string>("default");
  const [displayCount, setDisplayCount] = useState<string>("50");

  return (
    <>
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-center mb-4">Better Crypto Scanner</h1>
          <p className="text-center text-gray-400">Last Update: {new Date().toLocaleString()}</p>
        </div>

        <div className="flex flex-wrap gap-4 mb-8 items-center justify-between bg-white/5 backdrop-blur-lg p-4 rounded-lg">
          <div className="flex flex-wrap gap-4">
            <Select value={selectedExchange} onValueChange={setSelectedExchange}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="All Exchanges" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Exchanges</SelectItem>
                <SelectItem value="binance">Binance</SelectItem>
                {/* Add more exchanges */}
              </SelectContent>
            </Select>

            <Select value={selectedMarket} onValueChange={setSelectedMarket}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="All Markets" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Markets</SelectItem>
                {/* Add market options */}
              </SelectContent>
            </Select>

            <Select value={selectedSpread} onValueChange={setSelectedSpread}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="All Spreads" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Spreads</SelectItem>
                <SelectItem value="20plus">{">20%"}</SelectItem>
                <SelectItem value="10-20">10-20%</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedSort} onValueChange={setSelectedSort}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Sort By</SelectItem>
                <SelectItem value="spread_high">Spread (High to Low)</SelectItem>
                <SelectItem value="spread_low">Spread (Low to High)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-4">
            <Button
              variant="outline"
              className="bg-white/5 hover:bg-white/10"
              onClick={() => {
                setSelectedExchange("all");
                setSelectedMarket("all");
                setSelectedSpread("all");
                setSelectedSort("default");
              }}
            >
              <RefreshCcw className="mr-2 h-4 w-4" />
              Reset Filters
            </Button>
            <Button className="bg-[#F97316] hover:bg-[#F97316]/90">
              Create Watchlist
            </Button>
            <Select value={displayCount} onValueChange={setDisplayCount}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="50" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
                <SelectItem value="200">200</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-lg overflow-hidden">
          <ScrollArea className="h-[600px] rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Exchange</TableHead>
                  <TableHead>Trading Pair</TableHead>
                  <TableHead>High</TableHead>
                  <TableHead>Low</TableHead>
                  <TableHead>Last</TableHead>
                  <TableHead>Near 24h Low</TableHead>
                  <TableHead>Spread(LvH)</TableHead>
                  <TableHead>Spread Category</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.exchange}</TableCell>
                    <TableCell className="text-primary">{row.tradingPair}</TableCell>
                    <TableCell>{row.high}</TableCell>
                    <TableCell>{row.low}</TableCell>
                    <TableCell>{row.last}</TableCell>
                    <TableCell>{row.near24hLow}</TableCell>
                    <TableCell>{row.spreadLvh}</TableCell>
                    <TableCell>{row.spreadCategory}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      </main>
    </>
  );
}