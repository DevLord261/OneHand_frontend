import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "~/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  Heart,
  Share2,
  Users,
  Target,
  Clock,
  MessageCircle,
  ThumbsUp,
  Flag,
  MapPin,
  Star,
  TrendingUp,
} from "lucide-react";
import { LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;
  console.log(id);
  return null;
}
export default function ViewCampaign() {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [newComment, setNewComment] = useState("");

  // Mock data
  const campaign = {
    id: 1,
    title: "Revolutionary Solar-Powered Water Purifier for Rural Communities",
    description:
      "Help us bring clean, safe drinking water to remote villages using innovative solar technology. Our portable water purification system can provide clean water for up to 500 people daily.",
    raised: 75420,
    goal: 100000,
    backers: 1247,
    daysLeft: 23,
    category: "Technology",
    location: "San Francisco, CA",
    organizer: {
      name: "Sarah Johnson",
      avatar:
        "https://imgs.search.brave.com/EF9XGBa0IbZnCLhwSaFP0HhWP8MQZSeyrtmkVs5ssCM/rs:fit:0:180:1:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAzLzUyLzczLzgw/LzM2MF9GXzM1Mjcz/ODAxNl8xQk5iUW5P/elhCbTVBSDNqRGlo/UW5WMG5aZHZJY2Fa/VC5qcGc?height=40&width=40",
      verified: true,
      campaigns: 3,
      rating: 4.8,
    },
    heroImage:
      "https://images.gofundme.com/tVxiaczxyl-HnKqN1Ebn2QwXXq0=/720x405/https://d2g8igdw686xgo.cloudfront.net/91108601_1747357741800689_r.png?height=400&width=800",
    gallery: [
      "https://d2g8igdw686xgo.cloudfront.net/91108601_1747357757545517_r.png?height=200&width=300",
      "https://d2g8igdw686xgo.cloudfront.net/91108601_1747358070804733_r.png?height=200&width=300",
    ],
  };

  const progressPercentage = (campaign.raised / campaign.goal) * 100;

  const updates = [
    {
      id: 1,
      title: "Prototype Testing Complete!",
      content:
        "We've successfully completed testing of our solar purifier prototype in three different locations...",
      date: "2 days ago",
      likes: 45,
    },
    {
      id: 2,
      title: "Partnership with Local NGO Confirmed",
      content:
        "Excited to announce our partnership with WaterAid to help distribute our purifiers...",
      date: "1 week ago",
      likes: 32,
    },
  ];

  const comments = [
    {
      id: 1,
      user: "Mike Chen",
      avatar: "/placeholder.svg?height=32&width=32",
      content:
        "This is exactly what the world needs! Backed with $100. Keep up the great work!",
      date: "3 hours ago",
      likes: 12,
    },
    {
      id: 2,
      user: "Emma Rodriguez",
      avatar: "/placeholder.svg?height=32&width=32",
      content:
        "Love the innovation behind this project. How long does the solar charging take?",
      date: "1 day ago",
      likes: 8,
    },
  ];

  const rewards = [
    {
      amount: 25,
      title: "Early Bird Supporter",
      description: "Digital thank you card + project updates",
      claimed: 45,
      total: 100,
    },
    {
      amount: 100,
      title: "Water Hero",
      description: "Everything above + exclusive project stickers",
      claimed: 23,
      total: 50,
    },
    {
      amount: 500,
      title: "Community Champion",
      description: "Everything above + your name on our website",
      claimed: 8,
      total: 25,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Bar at Top */}
      <div className="w-full bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>{progressPercentage.toFixed(1)}% funded</span>
            <span>{campaign.daysLeft} days left</span>
          </div>
          <Progress value={progressPercentage} className="h-2 mt-1" />
        </div>
      </div>

      <div className="container mx-auto !px-4 !py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{campaign.category}</Badge>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  {campaign.location}
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                {campaign.title}
              </h1>

              <div className="relative aspect-video rounded-lg overflow-hidden">
                <img
                  src={campaign.heroImage || "/placeholder.svg"}
                  alt={campaign.title}
                  className="object-cover h-full"
                />
              </div>

              {/* Organizer Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={campaign.organizer.avatar || "/placeholder.svg"}
                    />
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">
                        {campaign.organizer.name}
                      </h3>
                      {campaign.organizer.verified && (
                        <Badge variant="outline" className="text-xs">
                          <Star className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      {campaign.organizer.campaigns} campaigns •{" "}
                      {campaign.organizer.rating}★ rating
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm">
                    <Flag className="h-4 w-4 mr-2" />
                    Report
                  </Button>
                </div>
              </div>
            </div>

            {/* Tabs Content */}
            <Tabs defaultValue="story" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="story">Story</TabsTrigger>
                <TabsTrigger value="updates">
                  Updates ({updates.length})
                </TabsTrigger>
                <TabsTrigger value="comments">
                  Comments ({comments.length})
                </TabsTrigger>
                <TabsTrigger value="rewards">Rewards</TabsTrigger>
              </TabsList>

              <TabsContent value="story" className="space-y-6 mt-6">
                <div className="prose max-w-none">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {campaign.description}
                  </p>

                  <h3 className="text-xl font-semibold mt-6 mb-4">
                    The Problem
                  </h3>
                  <p className="text-gray-700">
                    Over 2 billion people worldwide lack access to safely
                    managed drinking water at home. Rural communities are
                    disproportionately affected, often having to walk miles to
                    collect water that may not even be safe to drink.
                  </p>

                  <h3 className="text-xl font-semibold mt-6 mb-4">
                    Our Solution
                  </h3>
                  <p className="text-gray-700">
                    Our solar-powered water purification system uses advanced
                    UV-C technology combined with multi-stage filtration to
                    remove 99.99% of harmful bacteria, viruses, and
                    contaminants. The system is completely off-grid and can
                    purify up to 1000 liters of water per day.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                    {campaign.gallery.map((image, index) => (
                      <div
                        key={index}
                        className="relative aspect-video rounded-lg overflow-hidden"
                      >
                        {/* <img
                          src={image || "/placeholder.svg"}
                          alt={`Gallery image `}
                          className="object-cover"
                        /> */}
                        <img
                          src={image || "/placeholder.svg"}
                          alt="gallery"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>

                  <h3 className="text-xl font-semibold mt-6 mb-4">Impact</h3>
                  <p className="text-gray-700">
                    With your support, we can deploy these systems to 10 rural
                    communities, providing clean water access to over 5,000
                    people. Each system will be maintained by trained local
                    technicians, ensuring long-term sustainability.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="updates" className="space-y-4 mt-6">
                {updates.map((update) => (
                  <Card key={update.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">
                          {update.title}
                        </CardTitle>
                        <span className="text-sm text-gray-500">
                          {update.date}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">{update.content}</p>
                      <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm">
                          <ThumbsUp className="h-4 w-4 mr-2" />
                          {update.likes}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Reply
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="comments" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Leave a Comment</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea
                      placeholder="Share your thoughts or ask a question..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <Button>Post Comment</Button>
                  </CardContent>
                </Card>

                {comments.map((comment) => (
                  <Card key={comment.id}>
                    <CardContent className="!pt-6">
                      <div className="flex space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={comment.avatar || "/placeholder.svg"}
                          />
                          <AvatarFallback>{comment.user[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold text-sm">
                              {comment.user}
                            </h4>
                            <span className="text-xs text-gray-500">
                              {comment.date}
                            </span>
                          </div>
                          <p className="text-gray-700 mt-1">
                            {comment.content}
                          </p>
                          <div className="flex items-center space-x-4 mt-2">
                            <Button variant="ghost" size="sm">
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              {comment.likes}
                            </Button>
                            <Button variant="ghost" size="sm">
                              Reply
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="rewards" className="space-y-4 mt-6">
                {rewards.map((reward, index) => (
                  <Card key={index} className="relative">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">
                          ${reward.amount} - {reward.title}
                        </CardTitle>
                        <Badge variant="outline">
                          {reward.claimed}/{reward.total} claimed
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">{reward.description}</p>
                      <Progress
                        value={(reward.claimed / reward.total) * 100}
                        className="mb-4"
                      />
                      <Button className="w-full">Select Reward</Button>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              <Card>
                <CardContent className="!p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-green-600">
                        ${campaign.raised.toLocaleString()}
                      </span>
                      <Badge variant="outline" className="text-green-600">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {progressPercentage.toFixed(1)}%
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      raised of ${campaign.goal.toLocaleString()} goal
                    </p>
                    <Progress value={progressPercentage} className="h-3" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="flex items-center justify-center">
                        <Users className="h-4 w-4 mr-1 text-gray-600" />
                        <span className="font-semibold">
                          {campaign.backers.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">backers</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-center">
                        <Clock className="h-4 w-4 mr-1 text-gray-600" />
                        <span className="font-semibold">
                          {campaign.daysLeft}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">days left</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <Button className="w-full" size="lg">
                      <Target className="h-4 w-4 mr-2" />
                      Back This Project
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setIsWishlisted(!isWishlisted)}
                    >
                      <Heart
                        className={`h-4 w-4 mr-2 ${
                          isWishlisted ? "fill-red-500 text-red-500" : ""
                        }`}
                      />
                      {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
                    </Button>
                  </div>

                  <div className="text-xs text-gray-500 space-y-1">
                    <p>• All or nothing funding</p>
                    <p>
                      • This project will be funded on{" "}
                      {new Date(
                        Date.now() + campaign.daysLeft * 24 * 60 * 60 * 1000
                      ).toLocaleDateString()}
                    </p>
                    <p>• Secure payments via Stripe</p>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Campaign Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Average pledge
                    </span>
                    <span className="font-semibold">
                      ${Math.round(campaign.raised / campaign.backers)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Category rank</span>
                    <span className="font-semibold">#3 in Technology</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Social shares</span>
                    <span className="font-semibold">1,234</span>
                  </div>
                </CardContent>
              </Card>

              {/* Organizer Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">About the Creator</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3 mb-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={campaign.organizer.avatar || "/placeholder.svg"}
                      />
                      <AvatarFallback>SJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">
                        {campaign.organizer.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {campaign.organizer.campaigns} campaigns
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">
                    Environmental engineer with 10+ years experience in water
                    purification systems.
                  </p>
                  <Button variant="outline" className="w-full" size="sm">
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
