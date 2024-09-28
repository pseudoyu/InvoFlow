import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronLeftIcon, ChevronRightIcon, SearchIcon, PlusCircle } from "lucide-react"

export default function Dashboard() {
  const invoices = [
    { date: "2023-05-01", number: "INV-001", customer: "Acme Corp", amount: "$1,200.00", dueDate: "2023-05-15", status: "Paid" },
    { date: "2023-05-03", number: "INV-002", customer: "Globex Inc", amount: "$850.00", dueDate: "2023-05-17", status: "Pending" },
    { date: "2023-05-05", number: "INV-003", customer: "Initech", amount: "$2,000.00", dueDate: "2023-05-19", status: "Overdue" },
    { date: "2023-05-07", number: "INV-004", customer: "Hooli", amount: "$1,500.00", dueDate: "2023-05-21", status: "Paid" },
    { date: "2023-05-09", number: "INV-005", customer: "Pied Piper", amount: "$3,000.00", dueDate: "2023-05-23", status: "Pending" },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-blue-50">
      <header className="bg-blue-200 shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-4 flex items-center">
          <div className="flex items-center">
            <svg
              className="h-8 w-8 text-blue-600"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <path d="M22 6l-10 7L2 6" />
            </svg>
            <span className="ml-3 text-2xl font-semibold text-blue-800">InvoFlow</span>
          </div>
        </div>
      </header>
      <main className="flex-grow max-w-6xl mx-auto px-4 sm:px-8 lg:px-10 py-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-blue-900">Your Invoices</h1>
          <Link href="/create-invoice">
            <Button 
              className="bg-yellow-400 text-blue-900 hover:bg-yellow-300 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Create Invoice
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-10">
          <Card className="bg-white border-blue-200 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-lg font-medium text-blue-800">All Invoices</CardTitle>
              <svg
                className="h-4 w-4 text-blue-500"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-900">248</div>
              <p className="text-sm text-blue-600">+12% from last month</p>
            </CardContent>
          </Card>
          <Card className="bg-white border-blue-200 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-lg font-medium text-blue-800">Pending</CardTitle>
              <svg
                className="h-4 w-4 text-blue-500"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2v20" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-900">64</div>
              <p className="text-sm text-blue-600">+7% from last month</p>
            </CardContent>
          </Card>
          <Card className="bg-white border-blue-200 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-lg font-medium text-blue-800">Overdue</CardTitle>
              <svg
                className="h-4 w-4 text-blue-500"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" />
                <path d="M12 6v6l4 2" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-900">23</div>
              <p className="text-sm text-blue-600">-2% from last month</p>
            </CardContent>
          </Card>
          <Card className="bg-white border-blue-200 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-lg font-medium text-blue-800">Paid</CardTitle>
              <svg
                className="h-4 w-4 text-blue-500"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <path d="M22 4 12 14.01l-3-3" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-900">161</div>
              <p className="text-sm text-blue-600">+18% from last month</p>
            </CardContent>
          </Card>
        </div>
        <div className="bg-white shadow-md rounded-lg border border-blue-200">
          <div className="p-6 border-b border-blue-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-blue-900">Recent Invoices</h2>
            <div className="relative">
              <Input className="pl-10 text-lg border-blue-200 focus:border-blue-500 focus:ring-blue-500" placeholder="Search invoices..." />
              <SearchIcon className="absolute left-3 top-3.5 h-5 w-5 text-blue-400" />
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-50">
                <TableHead className="text-lg text-blue-800 py-4">Date</TableHead>
                <TableHead className="text-lg text-blue-800 py-4">Invoice Number</TableHead>
                <TableHead className="text-lg text-blue-800 py-4">Customer</TableHead>
                <TableHead className="text-lg text-blue-800 py-4">Amount</TableHead>
                <TableHead className="text-lg text-blue-800 py-4">Due Date</TableHead>
                <TableHead className="text-lg text-blue-800 py-4">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.number} className="hover:bg-blue-50">
                  <TableCell className="text-lg text-blue-700 py-4">{invoice.date}</TableCell>
                  <TableCell className="text-lg text-blue-700 py-4">{invoice.number}</TableCell>
                  <TableCell className="text-lg text-blue-700 py-4">{invoice.customer}</TableCell>
                  <TableCell className="text-lg text-blue-700 py-4">{invoice.amount}</TableCell>
                  <TableCell className="text-lg text-blue-700 py-4">{invoice.dueDate}</TableCell>
                  <TableCell>
                    <span
                      className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
                        invoice.status === "Paid"
                          ? "bg-green-100 text-green-800"
                          : invoice.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {invoice.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex items-center justify-between px-6 py-4 bg-blue-50 border-t border-blue-200 sm:px-8">
            <div className="flex-1 flex justify-between sm:hidden">
              <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                Previous
              </Button>
              <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                Next
              </Button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-base text-blue-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{" "}
                  <span className="font-medium">20</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <Button variant="outline" size="lg" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                  </Button>
                  <Button variant="outline" size="lg" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                    1
                  </Button>
                  <Button variant="outline" size="lg" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                    2
                  </Button>
                  <Button variant="outline" size="lg" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                    3
                  </Button>
                  <Button variant="outline" size="lg" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                  </Button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}