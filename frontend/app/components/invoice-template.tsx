"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle, Trash2, Download } from "lucide-react"

interface InvoiceItem {
  id: number
  description: string
  quantity: number
  rate: number
}

export default function InvoiceTemplate() {
  const [invoiceNumber, setInvoiceNumber] = useState("")
  const [invoiceDate, setInvoiceDate] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [clientName, setClientName] = useState("")
  const [clientAddress, setClientAddress] = useState("")
  const [clientEmail, setClientEmail] = useState("")
  const [clientPhone, setClientPhone] = useState("")
  const [termsAndConditions, setTermsAndConditions] = useState("")
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: 1, description: "Web Development", quantity: 1, rate: 1000 },
    { id: 2, description: "UI/UX Design", quantity: 1, rate: 500 },
  ])

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: items.length + 1,
      description: "",
      quantity: 0,
      rate: 0,
    }
    setItems([...items, newItem])
  }

  const deleteItem = (id: number) => {
    setItems(items.filter(item => item.id !== id))
  }

  const updateItem = (id: number, field: keyof InvoiceItem, value: string | number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ))
  }

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.quantity * item.rate, 0)
  }

  const subtotal = calculateSubtotal()
  const total = subtotal // Add tax calculation here if needed

  return (
    <div className="min-h-screen bg-blue-50 p-4 sm:p-6 md:p-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-900">Create New Invoice</h1>
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Side: Customization Panel */}
        <Card className="bg-white shadow-md border-blue-200">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-800">Customize Invoice</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="invoiceNumber" className="text-blue-700">Invoice Number</Label>
                  <Input
                    id="invoiceNumber"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                    placeholder="INV-001"
                    className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="invoiceDate" className="text-blue-700">Invoice Date</Label>
                  <Input
                    id="invoiceDate"
                    type="date"
                    value={invoiceDate}
                    onChange={(e) => setInvoiceDate(e.target.value)}
                    className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueDate" className="text-blue-700">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientName" className="text-blue-700">Client Name</Label>
                <Input
                  id="clientName"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="John Doe"
                  className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientAddress" className="text-blue-700">Client Address</Label>
                <Input
                  id="clientAddress"
                  value={clientAddress}
                  onChange={(e) => setClientAddress(e.target.value)}
                  placeholder="123 Main St, City, Country"
                  className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="clientEmail" className="text-blue-700">Client Email</Label>
                  <Input
                    id="clientEmail"
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clientPhone" className="text-blue-700">Client Phone</Label>
                  <Input
                    id="clientPhone"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="+1 234 567 8900"
                    className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-blue-700">Invoice Items</Label>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-blue-50">
                      <TableHead className="text-blue-800">Description</TableHead>
                      <TableHead className="text-blue-800">Quantity</TableHead>
                      <TableHead className="text-blue-800">Rate</TableHead>
                      <TableHead className="text-blue-800">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((item) => (
                      <TableRow key={item.id} className="hover:bg-blue-50">
                        <TableCell>
                          <Input
                            value={item.description}
                            onChange={(e) => updateItem(item.id, "description", e.target.value)}
                            placeholder="Item description"
                            className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateItem(item.id, "quantity", parseInt(e.target.value))}
                            placeholder="Qty"
                            className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={item.rate}
                            onChange={(e) => updateItem(item.id, "rate", parseFloat(e.target.value))}
                            placeholder="Rate"
                            className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => deleteItem(item.id)}
                            className="bg-red-100 text-red-600 hover:bg-red-200"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Button onClick={addItem} variant="outline" className="w-full border-blue-300 text-blue-700 hover:bg-blue-100">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add New Item
                </Button>
              </div>
              <div className="space-y-2">
                <Label htmlFor="termsAndConditions" className="text-blue-700">Terms & Conditions</Label>
                <Textarea
                  id="termsAndConditions"
                  value={termsAndConditions}
                  onChange={(e) => setTermsAndConditions(e.target.value)}
                  placeholder="Enter terms and conditions"
                  rows={4}
                  className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="flex space-x-4">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Save Invoice</Button>
                <Button variant="outline" className="w-full border-blue-300 text-blue-700 hover:bg-blue-100">Generate PDF</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Right Side: Invoice Preview */}
        <Card className="bg-white shadow-md border-blue-200">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-800">Invoice Preview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span className="text-2xl font-bold text-blue-800">InvoFlow</span>
              </div>
              <div className="text-right">
                <h2 className="text-3xl font-bold text-blue-900">INVOICE</h2>
                <p className="text-blue-600">#{invoiceNumber}</p>
                <p className="text-blue-600">Date: {invoiceDate}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-blue-800">Bill To:</h3>
                <p className="text-blue-700">{clientName}</p>
                <p className="text-blue-700">{clientAddress}</p>
                <p className="text-blue-700">{clientEmail}</p>
                <p className="text-blue-700">{clientPhone}</p>
              </div>
              <div className="text-right">
                <h3 className="font-semibold text-blue-800">Due Date:</h3>
                <p className="text-blue-700">{dueDate}</p>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-50">
                  <TableHead className="text-blue-800">Description</TableHead>
                  <TableHead className="text-blue-800 text-right">Quantity</TableHead>
                  <TableHead className="text-blue-800 text-right">Rate</TableHead>
                  <TableHead className="text-blue-800 text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id} className="hover:bg-blue-50">
                    <TableCell className="text-blue-700">{item.description}</TableCell>
                    <TableCell className="text-blue-700 text-right">{item.quantity}</TableCell>
                    <TableCell className="text-blue-700 text-right">${item.rate.toFixed(2)}</TableCell>
                    <TableCell className="text-blue-700 text-right">${(item.quantity * item.rate).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex justify-end">
              <div className="w-1/2 space-y-2">
                <div className="flex justify-between text-blue-700">
                  <span className="font-semibold">Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-blue-900">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-blue-800">Terms & Conditions:</h3>
              <p className="text-sm text-blue-600">{termsAndConditions}</p>
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              <Download className="mr-2 h-4 w-4" /> Download Invoice (PDF)
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}