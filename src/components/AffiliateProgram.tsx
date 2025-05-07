import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Copy, ArrowRight, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
const AffiliateProgram = () => {
  const [userId] = useState('USR123456'); // In a real app, this would come from auth context
  const [affiliateLink] = useState(`https://zuroagenda.com/ref/${userId}`);
  const [stats] = useState({
    clicks: 238,
    signups: 24,
    commissions: 'R$ 1.440,00',
    conversionRate: '10.08%',
    pendingPayment: 'R$ 320,00'
  });
  const {
    toast
  } = useToast();
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Link copiado!",
      description: "Link de afiliado copiado para a área de transferência."
    });
  };
  return <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Programa de Afiliados</h2>
        <p className="mt-2 text-gray-600">
          Indique a ZuroAgenda para colegas e ganhe comissão por cada nova assinatura.
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* Affiliate Link Card */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Seu Link de Afiliado</CardTitle>
            <CardDescription>
              Compartilhe este link único para receber comissões por indicações.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="bg-gray-100 text-gray-800 rounded-lg p-3 text-sm flex-1 truncate">
                {affiliateLink}
              </div>
              <Button onClick={() => copyToClipboard(affiliateLink)} className="bg-zuro hover:bg-zuro-dark text-white">
                <Copy className="h-4 w-4 mr-2" />
                Copiar
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Stats Card */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Seus Resultados</CardTitle>
            <CardDescription>
              Acompanhe o desempenho das suas indicações.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Cliques</p>
                <p className="text-2xl font-bold text-gray-900">{stats.clicks}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Conversão</p>
                <p className="text-2xl font-bold text-gray-900">{stats.signups}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Taxa de Conversão</p>
                <p className="text-2xl font-bold text-gray-900">{stats.conversionRate}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Comissões</p>
                <p className="text-2xl font-bold text-zuro">{stats.commissions}</p>
              </div>
            </div>
          </CardContent>
          
        </Card>
      </div>
      
      {/* Marketing Materials */}
      <Card className="shadow-md">
        
        
      </Card>
      
      {/* How To Guide */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Como Divulgar e Maximizar Ganhos</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left">Como funciona o programa de afiliados?</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 text-gray-700">
                  <p>
                    O Programa de Afiliados da ZuroAgenda oferece 20% de comissão recorrente para cada novo usuário que se cadastrar através do seu link de indicação. As comissões são pagas mensalmente.
                  </p>
                  <p>
                    Seu link de afiliado possui um cookie com validade de 30 dias, ou seja, se alguém clicar no seu link e realizar a assinatura em até 30 dias, você receberá a comissão.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left">Dicas para divulgar seu link</AccordionTrigger>
              <AccordionContent>
                <ol className="list-decimal list-inside space-y-2 text-gray-700 pl-2">
                  <li>Compartilhe com colegas de profissão através de grupos profissionais</li>
                  <li>Adicione o link na sua biografia de redes sociais</li>
                  <li>Crie conteúdo demonstrando como a ZuroAgenda melhorou sua rotina profissional</li>
                  <li>Mencione os benefícios específicos para sua área de atuação</li>
                  <li>Ofereça uma consultoria gratuita para novos assinantes que usarem seu link</li>
                </ol>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left">Como receber pagamentos</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 text-gray-700">
                  <p>Os pagamentos são realizados até o dia 20 de cada mês, referentes às devidas comissões, você vai receber via:</p>
                  <ul className="list-disc list-inside pl-2">
                    <li>Transferência bancária (Pix)</li>
                    
                    
                  </ul>
                  <p className="mt-2">Obtenha seu pagamento após 30 dias da compra e entre em contato via suporte para receber!</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
        <CardFooter className="bg-zuro/5 border-t">
          <p className="text-sm text-gray-600">
            Ainda tem dúvidas sobre o programa de afiliados? <a href="#" className="text-zuro hover:underline">Entre em contato com nossa equipe</a>.
          </p>
        </CardFooter>
      </Card>
    </div>;
};
export default AffiliateProgram;