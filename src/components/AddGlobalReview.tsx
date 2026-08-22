"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Star,
  MessageSquareQuote,
  Sparkles,
  Send,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface AddGlobalReviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddGlobalReview = ({
  open,
  onOpenChange,
}: AddGlobalReviewProps) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const displayedRating = hoverRating || rating;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log({
      rating,
      comment,
    });

    // API integration will be added here later.

    onOpenChange(false);
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-h-[90vh] overflow-y-auto border-orange-100 bg-background p-0 shadow-2xl shadow-orange-200/30 dark:border-orange-950/50 dark:shadow-orange-950/20 sm:max-w-lg
        "
      >
        {/* =========================
            Header
        ========================= */}

        <DialogHeader
          className=" relative overflow-hidden border-b border-orange-100 bg-orange-50/70 p-6 dark:border-orange-950/40 dark:bg-orange-950/20
          "
        >
          {/* Floating decoration */}

          <motion.div
            animate={{
              rotate: [0, 8, -8, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className=" pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-orange-300/20 blur-2xl
            "
          />

          <div className="relative">
            {/* Badge */}

            <Badge
              variant="outline"
              className=" mb-4 w-fit rounded-full border-orange-200 bg-orange-100 px-3 py-1.5 text-orange-700 dark:border-orange-900 dark:bg-orange-950/40 dark:text-orange-400
              "
            >
              <Sparkles className="h-3.5 w-3.5" />

              Share Your Experience
            </Badge>

            {/* Title */}

            <DialogTitle
              className="
                text-2xl
                font-bold
                tracking-tight
                text-slate-900
                dark:text-white
              "
            >
              Tell Us What You Think
            </DialogTitle>

            {/* Description */}

            <DialogDescription className="mt-2 max-w-md leading-relaxed">
              Your feedback helps FoodHub improve and helps other customers
              discover great meals.
            </DialogDescription>
          </div>
        </DialogHeader>

        {/* =========================
            Form
        ========================= */}

        <form onSubmit={handleSubmit}>
          <div className="space-y-6 p-6">

            {/* =========================
                Rating
            ========================= */}

            <Card
              className=" overflow-hidden border-orange-100 bg-orange-50/40 shadow-none dark:border-orange-950/40 dark:bg-orange-950/10
              "
            >
              <CardContent className="p-5">
                <div className="mb-4">
                  <Label
                    className="
                      text-sm
                      font-semibold
                      text-slate-900
                      dark:text-white
                    "
                  >
                    How was your experience?
                  </Label>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Select a rating from 1 to 5 stars.
                  </p>
                </div>

                {/* Stars */}

                <div
                  className="flex items-center gap-2"
                  onMouseLeave={() => setHoverRating(0)}
                >
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isActive = star <= displayedRating;

                    return (
                      <motion.button
                        key={star}
                        type="button"
                        whileHover={{
                          scale: 1.15,
                          y: -2,
                        }}
                        whileTap={{
                          scale: 0.9,
                        }}
                        onMouseEnter={() =>
                          setHoverRating(star)
                        }
                        onClick={() => setRating(star)}
                        className="
                          rounded-lg
                          p-1
                          outline-none
                          transition-colors
                          focus-visible:ring-2
                          focus-visible:ring-orange-500/40
                        "
                        aria-label={`Give ${star} star${star > 1 ? "s" : ""}`}
                      >
                        <Star
                          className={`
                            h-8
                            w-8
                            transition-all
                            duration-200
                            ${
                              isActive
                                ? "fill-orange-500 text-orange-500 drop-shadow-sm"
                                : "text-orange-200 dark:text-orange-900"
                            }
                          `}
                        />
                      </motion.button>
                    );
                  })}
                </div>

                {/* Rating text */}

                <div className="mt-3 h-5">
                  {displayedRating > 0 && (
                    <motion.p
                      key={displayedRating}
                      initial={{
                        opacity: 0,
                        y: 5,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      className="
                        text-sm
                        font-medium
                        text-orange-600
                        dark:text-orange-400
                      "
                    >
                      {displayedRating === 5 &&
                        "Excellent! ⭐"}

                      {displayedRating === 4 &&
                        "Great experience! 😊"}

                      {displayedRating === 3 &&
                        "It was good! 👍"}

                      {displayedRating === 2 &&
                        "Could be better."}

                      {displayedRating === 1 &&
                        "We'll try to improve."}
                    </motion.p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* =========================
                Comment
            ========================= */}

            <div className="space-y-2">
              <Label
                htmlFor="review-comment"
                className=" text-sm font-semibold text-slate-900 dark:text-white
                "
              >
                Your Review
              </Label>

              <div className="relative">
                <MessageSquareQuote
                  className=" pointer-events-none absolute left-4 top-4 h-5 w-5 text-orange-400
                  "
                />

                <Textarea
                  id="review-comment"
                  value={comment}
                  onChange={(event) =>
                    setComment(event.target.value)
                  }
                  placeholder="Tell us about your FoodHub experience..."
                  rows={5}
                  className=" resize-none rounded-xl border-orange-100 bg-background pl-12 pr-4 leading-relaxed transition-all duration-300 placeholder:text-muted-foreground focus-visible:border-orange-500 focus-visible:ring-orange-500/20 dark:border-orange-950/50
                  "
                />
              </div>

              <div className="flex justify-end">
                <Label className="text-xs text-muted-foreground">
                  {comment.length}/500
                </Label>
              </div>
            </div>

            {/* =========================
                Selected Rating Info
            ========================= */}

            {rating > 0 && (
              <motion.div
                initial={{
                  opacity: 0,
                  height: 0,
                }}
                animate={{
                  opacity: 1,
                  height: "auto",
                }}
                className=" flex items-center justify-between rounded-xl border border-orange-100 bg-orange-50 px-4 py-3 dark:border-orange-950/40 dark:bg-orange-950/20
                "
              >
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-orange-500 text-orange-500" />

                  <Label className="text-sm font-medium text-orange-700 dark:text-orange-400">
                    Your Rating
                  </Label>
                </div>

                <Badge
                  className=" border-orange-200 bg-orange-100 text-orange-700 hover:bg-orange-100 dark:border-orange-900 dark:bg-orange-950/40 dark:text-orange-400
                  "
                >
                  {rating}/5
                </Badge>
              </motion.div>
            )}
          </div>

          {/* =========================
              Footer
          ========================= */}

          <div
            className=" flex flex-col-reverse gap-3 border-t border-orange-100 bg-orange-50/30 p-5 sm:flex-row sm:justify-end dark:border-orange-950/40 dark:bg-orange-950/10
            "
          >
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className=" rounded-xl border-orange-200 bg-background text-orange-700 hover:bg-orange-50 hover:text-orange-700 dark:border-orange-900 dark:text-orange-400 dark:hover:bg-orange-950/30
              "
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={!rating || !comment.trim()}
              className=" group rounded-xl bg-orange-600 font-semibold text-white shadow-lg shadow-orange-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-700 hover:shadow-xl hover:shadow-orange-600/30 disabled:pointer-events-none disabled:opacity-50
              "
            >
              <Send className="h-4 w-4" />

              Submit Review
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddGlobalReview;