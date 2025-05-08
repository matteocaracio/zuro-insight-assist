
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Copy, FileSearch } from 'lucide-react';
import { AITypes } from '../types';

interface NutritionPlanTabProps {
  nutritionPlan: AITypes.NutritionPlan;
  onCopy: () => void;
}

export const NutritionPlanTab: React.FC<NutritionPlanTabProps> = ({ nutritionPlan, onCopy }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileSearch className="h-5 w-5 text-zuro" />
            Plano Alimentar
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onCopy}>
            <Copy className="h-4 w-4 mr-1" />
            Copiar
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Refeição</TableHead>
                <TableHead>Horário</TableHead>
                <TableHead>Alimentos</TableHead>
                <TableHead>Observações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {nutritionPlan.meals.map((meal, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{meal.name}</TableCell>
                  <TableCell>{meal.time}</TableCell>
                  <TableCell>
                    <ul className="list-disc pl-4">
                      {meal.foods.map((food, j) => (
                        <li key={j}>{food}</li>
                      ))}
                    </ul>
                  </TableCell>
                  <TableCell>{meal.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
