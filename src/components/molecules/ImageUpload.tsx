import { useState, useRef, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "@/lib/hooks/use-toast";
import { Upload, X, Image as ImageIcon } from "lucide-react";

interface ImageUploadProps {
  onImageSelected: (base64Data: string, fileName: string) => void;
  onImageRemoved: () => void;
  currentImage?: string;
  disabled?: boolean;
}

export default function ImageUpload({ 
  onImageSelected, 
  onImageRemoved, 
  currentImage, 
  disabled = false 
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Set initial preview from currentImage prop
  useEffect(() => {
    if (currentImage) {
      // If currentImage is a full URL, use it directly
      // If it's a path, construct the full URL
      const previewUrl = currentImage.startsWith('http') 
        ? currentImage 
        : `${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/v1/uploads/images/${currentImage.split('/').pop()}`;
      setPreview(previewUrl);
    } else {
      setPreview(null);
    }
  }, [currentImage]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a JPEG, PNG, GIF, or WebP image.",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Convert file to base64
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      // Create preview URL from base64
      setPreview(base64);
      onImageSelected(base64, file.name);
      
      toast({
        title: "Success",
        description: "Image selected successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to process image",
        variant: "destructive",
      });
    }
  }, [onImageSelected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    multiple: false,
    disabled: disabled,
    noClick: true, // Disable default click behavior
  });

  const handleRemoveImage = () => {
    setPreview(null);
    onImageRemoved();
  };

  const handleFileSelect = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <Label>Menu Item Image</Label>
      
      {preview ? (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded-lg border"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                  onClick={handleRemoveImage}
                  disabled={disabled}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">
                  Image selected successfully
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={(e) => handleFileSelect(e)}
                  disabled={disabled}
                  className="mt-2"
                >
                  Change Image
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card
          {...getRootProps()}
          onClick={handleFileSelect}
          className={`border-2 border-dashed cursor-pointer transition-colors ${
            isDragActive 
              ? 'border-primary bg-primary/5' 
              : 'border-muted-foreground/25 hover:border-primary/50'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <CardContent className="p-8 text-center">
            <input 
              {...getInputProps()} 
              ref={fileInputRef}
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  onDrop([file]);
                }
              }}
            />
            
            <div className="space-y-2">
              <ImageIcon className="h-8 w-8 mx-auto text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">
                  {isDragActive ? 'Drop the image here' : 'Select an image'}
                </p>
                <p className="text-xs text-muted-foreground">
                  Drag and drop, or click to select
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={disabled}
                className="mt-2"
                onClick={(e) => handleFileSelect(e)}
              >
                <Upload className="h-4 w-4 mr-2" />
                Choose File
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground mt-2">
              JPEG, PNG, GIF, WebP up to 5MB
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
