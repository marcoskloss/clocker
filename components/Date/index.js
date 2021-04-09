import { ptBR } from 'date-fns/locale'
import { format } from 'date-fns'

export function formatDate(date, pattern) {
  return format(date, pattern, { locale: ptBR })
}