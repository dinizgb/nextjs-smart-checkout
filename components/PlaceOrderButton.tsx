"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { placeOrderButton, confirmationDialog, successDrawer } from "@/resources"
import type { CartState } from "@/types"

interface PlaceOrderButtonProps {
  disabled: boolean
  cart: CartState
  onResetCart: () => void
}

export function PlaceOrderButton({ disabled, onResetCart }: PlaceOrderButtonProps) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [showSuccessDrawer, setShowSuccessDrawer] = useState(false)

  const handlePlaceOrder = () => {
    setShowConfirmDialog(true)
  }

  const handleConfirmOrder = () => {
    setShowConfirmDialog(false)
    setShowSuccessDrawer(true)
    onResetCart()
  }

  return (
    <>
      <section className="container mx-auto px-4 py-8">
        <div className="text-center">
          <Button onClick={handlePlaceOrder} disabled={disabled} className="px-8 py-8 text-xl cursor-pointer font-bold">
            {placeOrderButton.TEXT}
          </Button>
        </div>
      </section>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl">{confirmationDialog.TITLE}</AlertDialogTitle>
            <AlertDialogDescription className="text-lg">{confirmationDialog.DESCRIPTION}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-lg cursor-pointer">{confirmationDialog.CANCEL}</AlertDialogCancel>
            <AlertDialogAction className="text-lg cursor-pointer font-bold" onClick={handleConfirmOrder}>{confirmationDialog.ACTION}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Drawer open={showSuccessDrawer} onOpenChange={setShowSuccessDrawer}>
        <DrawerContent>
          <DrawerHeader className="text-center">
            <DrawerTitle className="text-4xl">{successDrawer.TITLE}</DrawerTitle>
            <DrawerDescription className="text-xl">{successDrawer.DESCRIPTION}</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className="pb-9">
            <DrawerClose className="w-fit mx-auto text-xl cursor-pointer p-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg">
              {successDrawer.CLOSE}
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
