
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Copy, ArrowRight, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

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
  
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Link copiado!",
      description: "Link de afiliado copiado para a área de transferência.",
    });
  };
  
  return (
    <div className="space-y-8">
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
              <Button 
                onClick={() => copyToClipboard(affiliateLink)} 
                className="bg-zuro hover:bg-zuro-dark text-white"
              >
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
                <p className="text-sm text-gray-500">Cadastros</p>
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
          <CardFooter className="border-t bg-gray-50 flex justify-between">
            <div className="text-sm">
              <span className="text-gray-500">Pendente:</span> <span className="font-medium">{stats.pendingPayment}</span>
            </div>
            <Button variant="link" className="text-zuro p-0">
              Ver histórico completo
              <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* Marketing Materials */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Materiais de Divulgação</CardTitle>
          <CardDescription>
            Utilize estes materiais para potencializar suas campanhas de afiliado.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {["Banner Padrão", "Post Instagram", "E-mail Marketing", "Descrição para Bio"].map((item, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="h-36 bg-gray-200 flex items-center justify-center">
                  <img 
                    src={`https://placehold.co/300x150/6F4FF2/FFFFFF/svg?text=Material ${i+1}`}
                    alt={`Material ${i+1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <h4 className="font-medium text-gray-900">{item}</h4>
                  <div className="flex mt-2">
                    <Button variant="outline" size="sm" className="text-xs mr-2">
                      <Copy className="h-3 w-3 mr-1" /> Copiar
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs">
                      Download
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
            <Card className="overflow-hidden bg-gray-50 border-dashed border-2 border-gray-300">
              <div className="h-full flex flex-col items-center justify-center p-6 text-center">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mb-3">
                  <Plus className="h-5 w-5 text-gray-500" />
                </div>
                <h4 className="font-medium text-gray-700">Solicitar Material Personalizado</h4>
                <p className="text-xs text-gray-500 mt-1">Precisa de algo específico?</p>
                <Button variant="ghost" size="sm" className="mt-3 text-xs text-zuro">
                  Fazer solicitação
                </Button>
              </div>
            </Card>
          </div>
        </CardContent>
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
                  <p>
                    Os pagamentos são realizados até o dia 15 de cada mês, referentes às comissões do mês anterior. Você pode escolher receber via:
                  </p>
                  <ul className="list-disc list-inside pl-2">
                    <li>Transferência bancária (Pix)</li>
                    <li>Créditos na plataforma</li>
                    <li>PayPal</li>
                  </ul>
                  <p className="mt-2">
                    Configure seu método de pagamento preferido na seção "Financeiro" do seu painel.
                  </p>
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
    </div>
  );
};

export default AffiliateProgram;
