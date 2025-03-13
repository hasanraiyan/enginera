"use client"

import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

interface EmptyStateProps {
  icon: ReactNode
  title: string
  description: string
  actionLabel?: string
  actionHref?: string
  secondaryActionLabel?: string
  secondaryActionHref?: string
  onAction?: () => void
  className?: string
}

export default function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  actionHref,
  secondaryActionLabel,
  secondaryActionHref,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <Card className={`w-full ${className}`}>
      <CardHeader className="pb-2 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">{icon}</div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-center text-muted-foreground">
        <p>{description}</p>
      </CardContent>
      {(actionLabel || secondaryActionLabel) && (
        <CardFooter className="flex flex-col sm:flex-row gap-2 justify-center pt-2">
          {actionLabel && actionHref ? (
            <Button asChild>
              <Link href={actionHref}>{actionLabel}</Link>
            </Button>
          ) : actionLabel && onAction ? (
            <Button onClick={onAction}>{actionLabel}</Button>
          ) : null}

          {secondaryActionLabel && secondaryActionHref && (
            <Button variant="outline" asChild>
              <Link href={secondaryActionHref}>{secondaryActionLabel}</Link>
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  )
}

