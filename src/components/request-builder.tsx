'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { HttpMethodEnum, type RequestType, type ResponseType, type MultiRegionResponse } from '@/lib/schema'
import { getTests } from '@/lib/getTests'

const HTTP_METHODS = HttpMethodEnum.options

const REGIONS = [
  { label: 'Global', value: 'global' },
  { label: 'Stockholm, Sweden', value: 'arn1' },
  { label: 'Mumbai, India', value: 'bom1' },
  { label: 'Paris, France', value: 'cdg1' },
  { label: 'Cleveland, USA', value: 'cle1' },
  { label: 'Cape Town, South Africa', value: 'cpt1' },
  { label: 'Dublin, Ireland', value: 'dub1' },
  { label: 'Frankfurt, Germany', value: 'fra1' },
  { label: 'São Paulo, Brazil', value: 'gru1' },
  { label: 'Hong Kong', value: 'hkg1' },
  { label: 'Tokyo, Japan', value: 'hnd1' },
  { label: 'Washington, D.C., USA', value: 'iad1' },
  { label: 'Seoul, South Korea', value: 'icn1' },
  { label: 'Osaka, Japan', value: 'kix1' },
  { label: 'London, United Kingdom', value: 'lhr1' },
  { label: 'Portland, USA', value: 'pdx1' },
  { label: 'San Francisco, USA', value: 'sfo1' },
  { label: 'Singapore', value: 'sin1' },
  { label: 'Sydney, Australia', value: 'syd1' },
]



export default function RequestBuilder() {
  const [method, setMethod] = useState<RequestType['method']>('GET')
  const [url, setUrl] = useState('')
  const { toast } = useToast()
  const [headers, setHeaders] = useState('')
  const [body, setBody] = useState('')
  const [response, setResponse] = useState<ResponseType | MultiRegionResponse |null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [region, setRegion] = useState('global')

  const handleSubmit = async () => {
    setIsLoading(true);
    setResponse(null);
  
    try {
      const parsedHeaders: Record<string, string> = {};
      headers.split('\n').forEach(line => {
        const [key, value] = line.split(':').map(part => part.trim());
        if (key && value) {
          parsedHeaders[key] = value;
        }
      });
  
      const requestData: RequestType = {
        method,
        url,
        headers: parsedHeaders,
        body: method !== 'GET' ? body : undefined,
      };
  
      const data = await getTests(region, requestData);
  
      if (region === "global") {
        setResponse(data as MultiRegionResponse);
      } else {
        setResponse(data as ResponseType);
      }
    } catch (error) {
      console.error('Error testing API:', error);
      toast({
        title: "Error",
        description: "Failed to test API",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Request Builder</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-4">
          <div className="w-1/3">
            <Label htmlFor="method">Method</Label>
            <Select value={method} onValueChange={(value: RequestType['method']) => setMethod(value)}>
              <SelectTrigger id="method">
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent>
                {HTTP_METHODS.map(m => (
                  <SelectItem key={m} value={m}>{m}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-2/3">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              placeholder="https://api.example.com/endpoint"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="region">Region</Label>
          <Select value={region} onValueChange={(value: string) => setRegion(value)}>
            <SelectTrigger id="region">
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              {REGIONS.map(({ label, value }) => (
                <SelectItem key={value} value={value}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="headers">Headers (one per line, format: Key: Value)</Label>
          <Textarea
            id="headers"
            placeholder="Content-Type: application/json"
            value={headers}
            onChange={(e) => setHeaders(e.target.value)}
          />
        </div>

        {method !== 'GET' && (
          <div>
            <Label htmlFor="body">Body</Label>
            <Textarea
              id="body"
              placeholder='{"key": "value"}'
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
        )}

        {response && (
          <div className="bg-muted p-4 rounded-md">
            <Label>
            {Array.isArray(response) ? (
                
                <ul>
                {response.map((item, index) => (
                    <li key={index} className='mb-5'>
                    <div className='mb-2'><strong>Region:</strong> {item.region}</div>
                    <div className='mb-2'><strong>Status:</strong> {item.status}</div>
                    <div className='mb-2'><strong>Duration (ms):</strong> {item.durationMs}</div>
                    <div className='mb-2'><strong>Body (ms):</strong> {item.body}</div>
                    
                    </li>
                ))}
                </ul>
            ) : (
                <div>
                <div><strong>Region:</strong> {response?.region}</div>
                <div><strong>Status:</strong> {response?.status}</div>
                <div><strong>Duration (ms):</strong> {response?.durationMs}</div>
                <div><strong>Body (ms):</strong> {response?.body}</div>
                </div>
            )}
            </Label>

          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button className='w-full' onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? 'Testing...' : 'Test'}
        </Button>
      </CardFooter>
    </Card>
  )
}

