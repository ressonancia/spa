import djangoLogoUrl from '@/assets/img/django.png'
import dotNetLogoUrl from '@/assets/img/dot-net.png'
import flaskLogoUrl from '@/assets/img/flask.png'
import golangLogoUrl from '@/assets/img/golang.png'
import javaLogoUrl from '@/assets/img/java.png'
import laravelLogoUrl from '@/assets/img/laravel.png'
import nodeLogoUrl from '@/assets/img/node.png'
import phpLogoUrl from '@/assets/img/php.png'
import pythonLogoUrl from '@/assets/img/python.png'
import symfonyLogoUrl from '@/assets/img/symfony.png'
import wordpressLogoUrl from '@/assets/img/wordpress.png'
import ressonanceLogoUrl from '@/assets/img/logo.png'

export const stackOptions = [
  { value: 'django', label: 'Django', logoUrl: djangoLogoUrl },
  { value: 'dotnet', label: 'Dot NET', logoUrl: dotNetLogoUrl },
  { value: 'flask', label: 'Flask', logoUrl: flaskLogoUrl },
  { value: 'golang', label: 'Golang', logoUrl: golangLogoUrl },
  { value: 'java', label: 'Java', logoUrl: javaLogoUrl },
  { value: 'laravel', label: 'Laravel', logoUrl: laravelLogoUrl },
  { value: 'node', label: 'Node', logoUrl: nodeLogoUrl },
  { value: 'php', label: 'PHP', logoUrl: phpLogoUrl },
  { value: 'python', label: 'Python', logoUrl: pythonLogoUrl },
  { value: 'symfony', label: 'Symfony', logoUrl: symfonyLogoUrl },
  { value: 'wordpress', label: 'Wordpress', logoUrl: wordpressLogoUrl },
]

const stackByValue = Object.fromEntries(stackOptions.map((stack) => [stack.value, stack]))

export function resolveStack(stackValue) {
  const normalizedStack = (stackValue ?? '').toLowerCase().trim()
  return stackByValue[normalizedStack] ?? null
}

export { ressonanceLogoUrl }
