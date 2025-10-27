export interface TestCategory {
  result: 'Positivo' | 'Negativo' | 'N/A';
  observations: string;
}

export type TestType = 'acessibilidade' | 'exploratorio';

export interface AccessibilityReport {
  id: string;
  screenName: string;
  testDate: string;
  priority: 'Alta' | 'Média' | 'Baixa';
  testerName: string;
  testType: TestType;
  categories: {
    [key: string]: TestCategory;
  };
  generalObservations: string;
}
