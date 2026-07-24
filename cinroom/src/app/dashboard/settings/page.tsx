import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Bell, Key, CreditCard, Wallet } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account, billing, and developer API keys.</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="bg-white/5 border border-white/10 h-12 px-2 gap-2 mb-8">
          <TabsTrigger value="profile" className="data-[state=active]:bg-white/10 data-[state=active]:text-white h-8">
            <User className="w-4 h-4 mr-2" /> Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-white/10 data-[state=active]:text-white h-8">
            <Bell className="w-4 h-4 mr-2" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="billing" className="data-[state=active]:bg-white/10 data-[state=active]:text-white h-8">
            <CreditCard className="w-4 h-4 mr-2" /> Billing & Plan
          </TabsTrigger>
          <TabsTrigger value="credits" className="data-[state=active]:bg-white/10 data-[state=active]:text-white h-8">
            <Wallet className="w-4 h-4 mr-2" /> Credits
          </TabsTrigger>
          <TabsTrigger value="api" className="data-[state=active]:bg-white/10 data-[state=active]:text-white h-8">
            <Key className="w-4 h-4 mr-2" /> API Keys
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Profile Information</CardTitle>
              <CardDescription>Update your account details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium text-white">Full Name</label>
                <Input defaultValue="Jane Doe" className="bg-white/5 border-white/10 text-white" />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium text-white">Email</label>
                <Input defaultValue="jane@example.com" type="email" className="bg-white/5 border-white/10 text-white" />
              </div>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 mt-4">Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">API Keys</CardTitle>
              <CardDescription>Use these keys to authenticate with the Cinroom API.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="flex-1 font-mono text-sm text-muted-foreground truncate">
                  sk_live_cinroom_xxxxxxxxxxxxxxxxxxxxxxxx
                </div>
                <Button variant="secondary" size="sm" className="bg-white/10 text-white hover:bg-white/20">Copy</Button>
                <Button variant="destructive" size="sm" className="bg-red-500/20 text-red-500 hover:bg-red-500/30">Revoke</Button>
              </div>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Generate New Key</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="credits">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Credit Balance</CardTitle>
              <CardDescription>Your current video generation credits.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-primary mb-4">42 <span className="text-lg text-muted-foreground font-normal">credits remaining</span></div>
              <Button className="bg-white text-black hover:bg-neutral-200">Buy More Credits</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Mock for other tabs */}
        <TabsContent value="notifications">
          <Card className="bg-white/5 border-white/10"><CardHeader><CardTitle className="text-white">Notifications</CardTitle><CardDescription>Notification preferences coming soon.</CardDescription></CardHeader></Card>
        </TabsContent>
        <TabsContent value="billing">
          <Card className="bg-white/5 border-white/10"><CardHeader><CardTitle className="text-white">Billing</CardTitle><CardDescription>Billing integration coming soon.</CardDescription></CardHeader></Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
