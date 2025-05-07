
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter
} from '@/components/ui/sidebar';
import { Book, Settings, FileText, Users, Copy, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { icon: FileText, label: 'AI Diagnóstico', path: '/' },
    { icon: Users, label: 'Pacientes', path: '/patients' },
    { icon: Settings, label: 'Configurações', path: '/settings' },
  ];

  return (
    <SidebarProvider defaultCollapsed={collapsed}>
      <div className="min-h-screen flex w-full bg-zuro-background">
        <Sidebar className="border-r border-gray-200 bg-white">
          <div className="p-4">
            <Link to="/" className="flex items-center">
              <img 
                src="https://placehold.co/40x40/6F4FF2/FFFFFF/svg?text=Z" 
                alt="ZuroAgenda" 
                className="h-10 w-10 rounded-lg" 
              />
              <span className={cn("ml-3 text-xl font-bold text-zuro", 
                collapsed ? "opacity-0 w-0" : "opacity-100"
              )}>
                ZuroAgenda
              </span>
            </Link>
          </div>
          <SidebarContent className="px-2">
            <SidebarGroup>
              <SidebarGroupContent>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton asChild className={cn(
                      "w-full justify-start",
                      location.pathname === item.path && "bg-zuro/10 text-zuro font-medium"
                    )}>
                      <Link to={item.path} className="flex items-center">
                        <item.icon className="h-5 w-5 mr-3" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="mb-2 px-2">
            <div className="flex flex-col px-3 py-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setCollapsed(!collapsed)}
                className="w-full justify-start"
              >
                <ArrowRight className={cn(
                  "h-4 w-4 mr-2 transition-transform",
                  collapsed ? "rotate-180" : ""
                )} />
                <span>{collapsed ? "" : "Recolher menu"}</span>
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
