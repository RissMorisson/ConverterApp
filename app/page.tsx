"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Star, StarOff, ShuffleIcon as Swap, Copy, Trash2, Moon, Sun, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import ConversionChart from "@/components/conversion-chart"
import { convertValue, getConversionCategories, getConversionUnits, getRelatedUnits } from "@/lib/conversion-utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function Home() {
  const { toast } = useToast()
  const [darkMode, setDarkMode] = useState(false)
  const [category, setCategory] = useState("length")
  const [fromUnit, setFromUnit] = useState("")
  const [toUnit, setToUnit] = useState("")
  const [inputValue, setInputValue] = useState("")
  const [result, setResult] = useState("")
  const [history, setHistory] = useState<
    Array<{
      id: string
      category: string
      fromUnit: string
      toUnit: string
      inputValue: string
      result: string
      timestamp: number
    }>
  >([])
  const [favorites, setFavorites] = useState<
    Array<{
      id: string
      category: string
      fromUnit: string
      toUnit: string
    }>
  >([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [chartData, setChartData] = useState<any>(null)
  const [copiedItems, setCopiedItems] = useState<Record<string, boolean>>({})

  // Initialize state from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem("conversionHistory")
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory))
    }

    const savedFavorites = localStorage.getItem("conversionFavorites")
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }

    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      setDarkMode(true)
      document.documentElement.classList.add("dark")
    }

    // Set default units based on category
    const units = getConversionUnits(category)
    if (units.length > 0) {
      setFromUnit(units[0].value)
      setToUnit(units.length > 1 ? units[1].value : units[0].value)
    }
  }, [])

  // Update localStorage when history or favorites change
  useEffect(() => {
    localStorage.setItem("conversionHistory", JSON.stringify(history))
  }, [history])

  useEffect(() => {
    localStorage.setItem("conversionFavorites", JSON.stringify(favorites))
  }, [favorites])

  // Update units when category changes
  useEffect(() => {
    const units = getConversionUnits(category)
    if (units.length > 0) {
      setFromUnit(units[0].value)
      setToUnit(units.length > 1 ? units[1].value : units[0].value)
    }
    setInputValue("")
    setResult("")
    setError("")
  }, [category])

  // Toggle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [darkMode])

  // Handle conversion
  const handleConvert = async () => {
    if (!inputValue) {
      setError("Please enter a value to convert")
      return
    }

    if (!fromUnit || !toUnit) {
      setError("Please select both units")
      return
    }

    setError("")
    setIsLoading(true)

    try {
      const numValue = Number.parseFloat(inputValue)
      if (isNaN(numValue)) {
        throw new Error("Please enter a valid number")
      }

      const convertedValue = await convertValue(category, fromUnit, toUnit, numValue)

      setResult(convertedValue.toString())

      // Add to history
      const newEntry = {
        id: Date.now().toString(),
        category,
        fromUnit,
        toUnit,
        inputValue,
        result: convertedValue.toString(),
        timestamp: Date.now(),
      }
      setHistory((prev) => [newEntry, ...prev].slice(0, 20)) // Keep only last 20 entries

      // Generate chart data for related units
      generateChartData(numValue)
    } catch (err: any) {
      setError(err.message || "An error occurred during conversion")
    } finally {
      setIsLoading(false)
    }
  }

  // Generate chart data for visualization
  const generateChartData = async (value: number) => {
    const relatedUnits = getRelatedUnits(category, fromUnit)
    if (relatedUnits.length <= 1) return

    const labels = []
    const data = []

    for (const unit of relatedUnits) {
      labels.push(unit)
      const convertedValue = await convertValue(category, fromUnit, unit, value)
      data.push(convertedValue)
    }

    setChartData({
      labels,
      datasets: [
        {
          label: `${value} ${fromUnit} in other units`,
          data,
          backgroundColor: "rgba(99, 102, 241, 0.5)",
          borderColor: "rgb(99, 102, 241)",
          borderWidth: 1,
        },
      ],
    })
  }

  // Swap units
  const handleSwapUnits = () => {
    setFromUnit(toUnit)
    setToUnit(fromUnit)
    setResult("")
  }

  // Copy result to clipboard
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)

    // Set this specific item as copied
    setCopiedItems((prev) => ({ ...prev, [id]: true }))

    // Show toast notification
    toast({
      title: "Copied!",
      description: "Content copied to clipboard",
    })

    // Reset after 2 seconds
    setTimeout(() => {
      setCopiedItems((prev) => ({ ...prev, [id]: false }))
    }, 2000)
  }

  const handleCopyResult = () => {
    if (result) {
      handleCopy(`${result} ${toUnit}`, "result")
    }
  }

  // Toggle favorite
  const handleToggleFavorite = () => {
    const favoriteId = `${category}-${fromUnit}-${toUnit}`
    const existingIndex = favorites.findIndex(
      (fav) => fav.category === category && fav.fromUnit === fromUnit && fav.toUnit === toUnit,
    )

    if (existingIndex >= 0) {
      setFavorites((prev) => prev.filter((_, i) => i !== existingIndex))
      toast({
        title: "Removed from favorites",
        description: "Conversion removed from favorites",
      })
    } else {
      setFavorites((prev) => [...prev, { id: favoriteId, category, fromUnit, toUnit }])
      toast({
        title: "Added to favorites",
        description: "Conversion added to favorites",
      })
    }
  }

  // Load favorite
  const handleLoadFavorite = (favorite: any) => {
    setCategory(favorite.category)
    setFromUnit(favorite.fromUnit)
    setToUnit(favorite.toUnit)
  }

  // Clear history
  const handleClearHistory = () => {
    setHistory([])
    toast({
      title: "History cleared",
      description: "Conversion history has been cleared",
    })
  }

  // Check if current conversion is favorited
  const isFavorited = favorites.some(
    (fav) => fav.category === category && fav.fromUnit === fromUnit && fav.toUnit === toUnit,
  )

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="dark:bg-gray-900 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold dark:text-white">Multi-Functional Converter</h1>
            <div className="flex items-center space-x-2">
              <Sun className="h-5 w-5 dark:text-white" />
              <Switch checked={darkMode} onCheckedChange={setDarkMode} aria-label="Toggle dark mode" />
              <Moon className="h-5 w-5 dark:text-white" />
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2 dark:text-white">Conversion Category</label>
                    <Select value={category} onValueChange={(value) => setCategory(value)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {getConversionCategories().map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-white">From</label>
                      <Select value={fromUnit} onValueChange={(value) => setFromUnit(value)}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                        <SelectContent>
                          {getConversionUnits(category).map((unit) => (
                            <SelectItem key={unit.value} value={unit.value}>
                              {unit.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-white">To</label>
                      <div className="flex items-center space-x-2">
                        <Select value={toUnit} onValueChange={(value) => setToUnit(value)}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select unit" />
                          </SelectTrigger>
                          <SelectContent>
                            {getConversionUnits(category).map((unit) => (
                              <SelectItem key={unit.value} value={unit.value}>
                                {unit.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => {
                                  handleSwapUnits()
                                  toast({
                                    title: "Units swapped",
                                    description: "Source and target units have been swapped",
                                  })
                                }}
                                className="flex-shrink-0"
                              >
                                <Swap className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Swap units</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2 dark:text-white">Value</label>
                    <Input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Enter value to convert"
                      className="w-full"
                    />
                    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                  </div>

                  <div className="flex justify-between items-center mb-6">
                    <Button
                      onClick={() => {
                        handleConvert()
                        if (!error && inputValue) {
                          toast({
                            title: "Conversion complete",
                            description: "Your value has been converted successfully",
                          })
                        }
                      }}
                      disabled={isLoading}
                    >
                      {isLoading ? "Converting..." : "Convert"}
                    </Button>
                    <div className="flex items-center space-x-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => {
                                handleToggleFavorite()
                                // Toast is already handled in the handleToggleFavorite function
                              }}
                            >
                              {isFavorited ? (
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              ) : (
                                <StarOff className="h-4 w-4" />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{isFavorited ? "Remove from favorites" : "Add to favorites"}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline" size="icon" onClick={handleCopyResult} disabled={!result}>
                              {copiedItems["result"] ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Copy result</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>

                  {result && (
                    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Result:</p>
                      </div>
                      <div className="mt-1 overflow-x-auto">
                        <p className="text-2xl font-bold dark:text-white whitespace-nowrap pr-4">
                          {result} {toUnit}
                        </p>
                      </div>
                    </div>
                  )}

                  {chartData && (
                    <div className="mt-8">
                      <h3 className="text-lg font-medium mb-4 dark:text-white">Comparison with Related Units</h3>
                      <div className="overflow-x-auto">
                        <div className="h-64 min-w-[500px]">
                          <ConversionChart data={chartData} />
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div>
              <Tabs defaultValue="favorites">
                <TabsList className="w-full">
                  <TabsTrigger value="favorites" className="w-1/2">
                    Favorites
                  </TabsTrigger>
                  <TabsTrigger value="history" className="w-1/2">
                    History
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="favorites">
                  <Card>
                    <CardContent className="p-4">
                      {favorites.length === 0 ? (
                        <p className="text-center py-4 text-gray-500 dark:text-gray-400">
                          No favorites yet. Star a conversion to add it here.
                        </p>
                      ) : (
                        <ScrollArea className="h-[400px]">
                          <div className="space-y-2">
                            {favorites.map((favorite) => (
                              <div
                                key={favorite.id}
                                className="p-3 bg-gray-100 dark:bg-gray-800 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                                onClick={() => handleLoadFavorite(favorite)}
                              >
                                <div className="flex justify-between items-center mb-2">
                                  <Badge variant="outline">{favorite.category}</Badge>
                                </div>
                                <div className="overflow-x-auto">
                                  <p className="font-medium dark:text-white whitespace-nowrap pr-4">
                                    {favorite.fromUnit} → {favorite.toUnit}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="history">
                  <Card>
                    <CardContent className="p-4">
                      {history.length === 0 ? (
                        <p className="text-center py-4 text-gray-500 dark:text-gray-400">No conversion history yet.</p>
                      ) : (
                        <>
                          <div className="flex justify-end mb-2">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      handleClearHistory();
                                      // Toast is already handled in the handleClearHistory function
                                    }}
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Clear History
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Clear all history</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          <div style={{ maxHeight: 400, overflowY: "auto" }}>
                            <div className="space-y-2">
                              {history.map((entry) => (
                                // AWAL PERUBAHAN: Tambahkan 'overflow-hidden' di sini
                                <div key={entry.id} className="p-3 bg-gray-100 dark:bg-gray-800 rounded-md w-full" style={{ overflow: "visible" }}>
                                  {/* Header: Kategori, Copy, Tanggal (Gunakan versi yang sudah diperbaiki) */}
                                  <div className="flex justify-between items-center mb-2">
                                    <div>
                                      <Badge variant="outline">{entry.category}</Badge>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <TooltipProvider>
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <Button
                                              variant="ghost"
                                              size="icon"
                                              className="h-6 w-6 flex-shrink-0"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                handleCopy(
                                                  `${entry.inputValue} ${entry.fromUnit} = ${entry.result} ${entry.toUnit}`,
                                                  entry.id
                                                );
                                              }}
                                            >
                                              {copiedItems[entry.id] ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                                            </Button>
                                          </TooltipTrigger>
                                          <TooltipContent>
                                            <p>Copy conversion</p>
                                          </TooltipContent>
                                        </Tooltip>
                                      </TooltipProvider>
                                      <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
                                        {new Date(entry.timestamp).toLocaleString()}
                                      </span>
                                    </div>
                                  </div>
                                  {/* AKHIR PERUBAHAN PADA KARTU ITEM */}

                                  {/* Hasil Konversi: Scrollable (Gunakan struktur terakhir yang disarankan) */}
                                  {/* Kelas .history-scroll-container dari globals.css akan memberikan overflow-x: auto; dan width: 100%; */}
                                  <div className="history-scroll-container" style={{ overflowX: "auto", width: "100%" }}>
                                    <div style={{ minWidth: "max-content", display: "inline-block", whiteSpace: "nowrap" }}>
                                      <p className="font-medium dark:text-white pr-4">
                                        {entry.inputValue} {entry.fromUnit} = {entry.result} {entry.toUnit}
                                      </p>
                                    </div>
                                  </div>
                                  {/* AKHIR PERUBAHAN PADA KARTU ITEM */}
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
