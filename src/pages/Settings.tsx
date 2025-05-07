
import React from 'react';
import Layout from '@/components/Layout';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, ArrowRight, Wallet } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';

const Settings = () => {
  return (
    <Layout>
      <div className="space-y-8">
        <div className="bg-gradient-to-r from-purple-600 to-purple-400 p-6 rounded-lg shadow-md text-white mb-6">
          <h1 className="text-3xl font-bold">Configurações</h1>
          <p className="mt-2 opacity-90">
            Personalize sua experiência e gerencie suas configurações.
          </p>
        </div>
        
        <Tabs defaultValue="affiliate" className="w-full">
          <TabsList className="w-full mb-6 grid grid-cols-3 bg-gray-100">
            <TabsTrigger value="affiliate" className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-purple-500">
              Programa de Afiliados
            </TabsTrigger>
            <TabsTrigger value="account" className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-purple-500">
              Conta
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-purple-500">
              Notificações
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="affiliate">
            <AffiliateProgram />
          </TabsContent>
          
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Conta</CardTitle>
                <CardDescription>Gerencie suas informações pessoais e preferências de conta.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Recursos de configuração de conta serão adicionados em breve.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Preferências de Notificação</CardTitle>
                <CardDescription>Controle quais notificações você deseja receber.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Recursos de notificação serão adicionados em breve.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

const AffiliateProgram = () => {
  // Use localStorage for persistent storage of affiliate data
  const [stats, setStats] = useState(() => {
    const savedStats = localStorage.getItem('affiliateStats');
    return savedStats ? JSON.parse(savedStats) : {
      clicks: 184,
      signups: 37,
      conversionRate: 20.1,
      earnings: 925.00
    };
  });
  
  const [affiliateLink, setAffiliateLink] = useState(() => {
    const savedLink = localStorage.getItem('affiliateLink');
    return savedLink || `https://zuroagenda.com.br/register?ref=${generateRefCode()}`;
  });
  
  const { toast } = useToast();

  // Save affiliate data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('affiliateStats', JSON.stringify(stats));
    localStorage.setItem('affiliateLink', affiliateLink);
  }, [stats, affiliateLink]);

  function generateRefCode() {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(affiliateLink);
    toast({
      title: "Link copiado!",
      description: "Link de afiliado copiado para a área de transferência."
    });
  };

  const handleWithdraw = () => {
    window.open("https://wa.me/5514998649264?text=Bom%20dia%2C%20Quero%20sacar%20minha%20comiss%C3%A3o!", "_blank");
  };

  // Simulate incremental stats updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prevStats => {
        // Small random increases to simulate live data
        const newClicks = prevStats.clicks + Math.floor(Math.random() * 3);
        const newSignups = prevStats.signups + (Math.random() > 0.7 ? 1 : 0);
        const newConversion = (newSignups / newClicks * 100).toFixed(1);
        const newEarnings = prevStats.earnings + (Math.random() > 0.8 ? 25 : 0);
        
        return {
          clicks: newClicks,
          signups: newSignups,
          conversionRate: parseFloat(newConversion),
          earnings: newEarnings
        };
      });
    }, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="md:col-span-2 shadow-md border-purple-100">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-white border-b">
            <CardTitle className="text-purple-800">Seu Link de Afiliado</CardTitle>
            <CardDescription>Compartilhe este link para ganhar comissões por cada novo assinante.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="bg-gray-50 p-3 rounded-md border border-gray-200 flex-grow font-mono text-sm overflow-auto">
                {affiliateLink}
              </div>
              <Button 
                onClick={copyToClipboard} 
                className="bg-purple-600 hover:bg-purple-700 text-white whitespace-nowrap"
              >
                <Copy className="h-4 w-4 mr-2" /> Copiar Link
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md border-purple-100">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-white border-b">
            <CardTitle className="text-purple-800">Desempenho</CardTitle>
            <CardDescription>Acompanhe o desempenho das suas indicações.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200 text-center">
                <p className="text-sm text-gray-500">Cliques</p>
                <p className="text-2xl font-bold text-purple-700 mt-1">{stats.clicks}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200 text-center">
                <p className="text-sm text-gray-500">Cadastros</p>
                <p className="text-2xl font-bold text-purple-700 mt-1">{stats.signups}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200 text-center">
                <p className="text-sm text-gray-500">Taxa de Conversão</p>
                <p className="text-2xl font-bold text-purple-700 mt-1">{stats.conversionRate}%</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200 text-center">
                <p className="text-sm text-gray-500">Comissões</p>
                <p className="text-2xl font-bold text-purple-700 mt-1">R$ {stats.earnings.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md border-purple-100">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-white border-b">
            <CardTitle className="text-purple-800">Comissões</CardTitle>
            <CardDescription>Gerencie suas comissões e saques.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="bg-purple-50 border border-purple-100 rounded-md p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Saldo Disponível</h3>
                  <span className="text-2xl font-bold text-purple-700">R$ {stats.earnings.toFixed(2)}</span>
                </div>
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700 text-white mt-2"
                  onClick={handleWithdraw}
                >
                  <Wallet className="h-4 w-4 mr-2" /> Sacar Comissão
                </Button>
                <p className="text-xs text-gray-500 mt-2">
                  O pagamento é processado em até 5 dias úteis após a solicitação.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-md border-purple-100">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-white border-b">
          <CardTitle className="text-purple-800">Como Divulgar</CardTitle>
          <CardDescription>Dicas e recursos para maximizar seus ganhos como afiliado.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-medium mb-3 text-purple-800">Passo a Passo</h3>
                <ol className="space-y-3 list-decimal list-inside text-gray-700">
                  <li className="pl-2">
                    Copie seu link exclusivo de afiliado
                  </li>
                  <li className="pl-2">
                    Compartilhe com profissionais de saúde que possam se beneficiar da ZuroAgenda
                  </li>
                  <li className="pl-2">
                    Quando alguém se cadastrar usando seu link, você receberá uma comissão
                  </li>
                  <li className="pl-2">
                    Acompanhe seus resultados nesta página
                  </li>
                  <li className="pl-2">
                    Solicite o saque de suas comissões quando desejar
                  </li>
                </ol>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-3 text-purple-800">Materiais de Divulgação</h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded-md border border-gray-200 flex items-center justify-between">
                    <span className="font-medium">Banner Digital</span>
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-md border border-gray-200 flex items-center justify-between">
                    <span className="font-medium">Post para Instagram</span>
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-md border border-gray-200 flex items-center justify-between">
                    <span className="font-medium">Texto para WhatsApp</span>
                    <Button variant="outline" size="sm">
                      Copiar
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-medium mb-4 text-purple-800">Perguntas Frequentes</h3>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Como funciona o programa de afiliados?</AccordionTrigger>
                  <AccordionContent>
                    Você recebe 25% de comissão sobre o valor da assinatura de cada cliente que se cadastrar através do seu link de afiliado, durante todo o tempo que o cliente permanecer ativo na plataforma.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Quando recebo minhas comissões?</AccordionTrigger>
                  <AccordionContent>
                    As comissões são calculadas mensalmente e ficam disponíveis para saque após 30 dias da assinatura do cliente indicado, para garantir que não haverá cancelamentos ou estornos.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Como receber meus pagamentos?</AccordionTrigger>
                  <AccordionContent>
                    Você pode solicitar o saque de suas comissões clicando no botão "Sacar Comissão". O pagamento será processado via Pix ou transferência bancária em até 5 dias úteis. Para agilizar o processo, você será redirecionado para nosso WhatsApp de suporte.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>Há um valor mínimo para saque?</AccordionTrigger>
                  <AccordionContent>
                    Sim, o valor mínimo para saque é de R$ 100,00. Quando seu saldo atingir este valor, você poderá solicitar o pagamento.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t bg-gray-50">
          <div className="w-full flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Precisa de ajuda? Entre em contato com nossa equipe de suporte.
            </p>
            <Button variant="outline">
              Contato
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Settings;
