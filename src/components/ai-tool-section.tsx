"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Wand2 } from 'lucide-react';
import Image from 'next/image';
import type { SuggestMakeupStyleOutput } from '@/ai/flows/ai-makeup-style-suggestion';

export default function AiToolSection() {
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [data, setData] = useState<SuggestMakeupStyleOutput | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB limit
        setError('File size must be less than 4MB.');
        return;
      }
      setError(null);
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!photo) {
      setError('Please upload a photo first.');
      return;
    }
    setError(null);
    setRunning(true);
    setData(null);

    const reader = new FileReader();
    reader.readAsDataURL(photo);
    reader.onload = async () => {
      try {
        const photoDataUri = reader.result as string;
        const response = await fetch('/api/suggestMakeupStyle', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ photoDataUri }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'An unknown error occurred');
        }

        const result = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err.message || 'Failed to get suggestion.');
      } finally {
        setRunning(false);
      }
    };
    reader.onerror = () => {
      setError('Failed to read the file.');
      setRunning(false);
    };
  };

  return (
    <section id="ai-tool" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
            <Wand2 className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="font-headline text-4xl font-bold">AI Makeup Stylist</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Upload your photo and let our AI suggest the perfect makeup style and color palette for you.
            </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <Card>
            <CardHeader>
              <CardTitle>Get Your Suggestion</CardTitle>
              <CardDescription>Upload a clear, well-lit photo of your face.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="photo-upload">Your Photo</Label>
                <Input id="photo-upload" type="file" accept="image/*" onChange={handleFileChange} />
              </div>

              {photoPreview && (
                <div className="mt-4">
                    <p className="text-sm font-medium mb-2">Preview:</p>
                    <Image src={photoPreview} alt="Uploaded photo preview" width={200} height={200} className="rounded-md object-cover aspect-square" />
                </div>
              )}

              <Button onClick={handleSubmit} disabled={running || !photo} className="w-full">
                {running ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Get Style Suggestion'
                )}
              </Button>
              
              {error && (
                <Alert variant="destructive" className="mt-4">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
          
          <div className="h-full">
            {running && (
                <Card className="flex flex-col items-center justify-center h-full min-h-[300px] bg-accent/20 dark:bg-accent/50">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    <p className="mt-4 text-muted-foreground">Generating your personalized look...</p>
                </Card>
            )}
            {data && !running && (
                <Card className="bg-accent/20 dark:bg-accent/50 h-full animate-in fade-in duration-500">
                    <CardHeader>
                        <CardTitle className="text-primary">Your Personalized Suggestions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <h3 className="font-bold text-lg mb-2">Suggested Style</h3>
                            <p className="text-muted-foreground whitespace-pre-wrap">{data.styleSuggestion}</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-2">Color Palette</h3>
                            <p className="text-muted-foreground whitespace-pre-wrap">{data.colorPalette}</p>
                        </div>
                    </CardContent>
                </Card>
            )}
            {!data && !running && (
                 <Card className="flex flex-col items-center justify-center h-full min-h-[300px] border-dashed">
                    <Wand2 className="h-12 w-12 text-muted-foreground/50" />
                    <p className="mt-4 text-muted-foreground">Your results will appear here</p>
                </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
