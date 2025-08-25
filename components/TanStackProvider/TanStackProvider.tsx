"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React, { useState } from "react"

export default function TanStackProvider({ children }: { children: React.ReactNode }) {

    const [qc] = useState(() => new QueryClient());
    // const qc: QueryClient = new QueryClient()
    return (
        <QueryClientProvider client={qc}>
            {children}
        </QueryClientProvider>
    )
}