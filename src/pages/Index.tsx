import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { Textarea } from '@/components/ui/textarea';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
}

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  unread: boolean;
}

export default function Index() {
  const [currentView, setCurrentView] = useState<'auth' | 'dashboard'>('auth');
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login');
  const [user, setUser] = useState<User | null>(null);
  const [newMessage, setNewMessage] = useState('');
  
  // Mock data
  const [messages] = useState<Message[]>([
    {
      id: '1',
      sender: 'Анна Петрова',
      content: 'Привет! Как дела с проектом?',
      timestamp: new Date('2024-01-15T10:30:00'),
      unread: true
    },
    {
      id: '2', 
      sender: 'Михаил Сидоров',
      content: 'Отправил документы на согласование',
      timestamp: new Date('2024-01-15T09:15:00'),
      unread: false
    },
    {
      id: '3',
      sender: 'Елена Козлова',
      content: 'Встреча перенесена на завтра',
      timestamp: new Date('2024-01-14T16:45:00'),
      unread: true
    }
  ]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const mockUser: User = {
      id: '1',
      name: 'Иван Петров',
      email: 'ivan@example.com',
      avatar: '',
      role: 'Пользователь'
    };
    setUser(mockUser);
    setCurrentView('dashboard');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const mockUser: User = {
      id: '2',
      name: 'Новый Пользователь',
      email: 'new@example.com',
      avatar: '',
      role: 'Пользователь'
    };
    setUser(mockUser);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('auth');
    setAuthTab('login');
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      console.log('Сообщение отправлено:', newMessage);
      setNewMessage('');
    }
  };

  if (currentView === 'auth') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
              <Icon name="User" size={24} className="text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Добро пожаловать</h1>
            <p className="text-gray-600">Войдите в систему или создайте новый аккаунт</p>
          </div>

          <Card className="shadow-xl border-0">
            <CardHeader className="text-center pb-4">
              <Tabs value={authTab} onValueChange={(value) => setAuthTab(value as 'login' | 'register')}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login" className="text-sm">Вход</TabsTrigger>
                  <TabsTrigger value="register" className="text-sm">Регистрация</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>

            <CardContent className="space-y-4">
              {authTab === 'login' ? (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Электронная почта</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="ivan@example.com"
                      className="h-11"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Пароль</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="h-11"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full h-11 text-base font-medium">
                    <Icon name="LogIn" size={18} className="mr-2" />
                    Войти
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Полное имя</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Иван Петров"
                      className="h-11"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-email">Электронная почта</Label>
                    <Input
                      id="reg-email"
                      type="email"
                      placeholder="ivan@example.com"
                      className="h-11"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-password">Пароль</Label>
                    <Input
                      id="reg-password"
                      type="password"
                      placeholder="••••••••"
                      className="h-11"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Подтвердите пароль</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="••••••••"
                      className="h-11"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full h-11 text-base font-medium">
                    <Icon name="UserPlus" size={18} className="mr-2" />
                    Зарегистрироваться
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="User" size={16} className="text-primary-foreground" />
                </div>
                <h1 className="text-xl font-semibold text-gray-900">Личный кабинет</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="text-sm">
                <Icon name="Shield" size={14} className="mr-1" />
                {user?.role}
              </Badge>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <Icon name="LogOut" size={16} className="mr-2" />
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="shadow-sm">
              <CardHeader className="text-center pb-4">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="text-xl font-semibold bg-primary/10 text-primary">
                    {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">{user?.name}</CardTitle>
                <CardDescription className="text-sm">{user?.email}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <Icon name="Mail" size={20} className="mx-auto mb-2 text-blue-600" />
                    <div className="text-sm font-medium text-gray-900">
                      {messages.filter(m => m.unread).length}
                    </div>
                    <div className="text-xs text-gray-500">Непрочитанных</div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <Icon name="CheckCircle" size={20} className="mx-auto mb-2 text-green-600" />
                    <div className="text-sm font-medium text-gray-900">5</div>
                    <div className="text-xs text-gray-500">Выполнено</div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="Settings" size={16} className="mr-2" />
                    Настройки профиля
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="Bell" size={16} className="mr-2" />
                    Уведомления
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="HelpCircle" size={16} className="mr-2" />
                    Поддержка
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Messages Panel */}
          <div className="lg:col-span-2">
            <Card className="shadow-sm h-[600px] flex flex-col">
              <CardHeader className="flex-shrink-0">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Icon name="MessageSquare" size={20} className="mr-2" />
                    Сообщения
                  </CardTitle>
                  <Badge variant="secondary">
                    {messages.filter(m => m.unread).length} новых
                  </Badge>
                </div>
                <CardDescription>
                  Ваши последние сообщения и уведомления
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col">
                {/* Messages List */}
                <div className="flex-1 space-y-3 overflow-y-auto mb-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-4 rounded-lg border transition-colors hover:bg-gray-50 ${
                        message.unread ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="text-xs bg-gray-200">
                              {message.sender.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-sm text-gray-900">
                              {message.sender}
                            </div>
                            <div className="text-xs text-gray-500">
                              {message.timestamp.toLocaleDateString('ru-RU', {
                                day: 'numeric',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </div>
                          </div>
                        </div>
                        {message.unread && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-sm text-gray-700 ml-11">{message.content}</p>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="flex-shrink-0 border-t pt-4">
                  <div className="flex space-x-2">
                    <Textarea
                      placeholder="Написать сообщение..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1 min-h-[80px] resize-none"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          sendMessage();
                        }
                      }}
                    />
                    <Button 
                      onClick={sendMessage}
                      disabled={!newMessage.trim()}
                      className="self-end"
                    >
                      <Icon name="Send" size={16} />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Нажмите Enter для отправки, Shift+Enter для новой строки
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}