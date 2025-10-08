import { Download, FileText, FileSpreadsheet, File } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const ExportButton = () => {
  const handleExport = (format: string) => {
    // This would be replaced with actual export logic
    toast({
      title: "Ekspor dimulai",
      description: `Mengekspor data dalam format ${format}...`,
      duration: 3000,
    });

    // Simulate export process (replace with actual export logic)
    console.log(`Mengekspor dalam format ${format}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700" variant={'outline'} size={'sm'}>
          <Download className="mr-2 h-4 w-4" />
          Ekspor
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 right-0">
        <DropdownMenuItem
          onClick={() => handleExport("PDF")}
          className="cursor-pointer"
        >
          <FileText className="mr-2 h-4 w-4 text-red-500" />
          <span>Ekspor sebagai PDF</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleExport("CSV")}
          className="cursor-pointer"
        >
          <File className="mr-2 h-4 w-4 text-green-500" />
          <span>Ekspor sebagai CSV</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => handleExport("Excel")}
          className="cursor-pointer"
        >
          <FileSpreadsheet className="mr-2 h-4 w-4 text-blue-500" />
          <span>Ekspor sebagai Excel</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExportButton;
