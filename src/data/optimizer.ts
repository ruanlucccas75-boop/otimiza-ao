export type TweakCategory =
  | "privacy"
  | "performance"
  | "system"
  | "network"
  | "ui"
  | "security"
  | "updates";

export type Tweak = {
  id: string;
  label: string;
  description: string;
  category: TweakCategory;
  risk: "low" | "medium" | "high";
};

export const CATEGORY_META: Record<
  TweakCategory,
  { label: string; color: string; icon: string }
> = {
  privacy: { label: "Privacidade", color: "#ef4444", icon: "Shield" },
  performance: { label: "Desempenho", color: "#f59e0b", icon: "Gauge" },
  system: { label: "Sistema", color: "#3b82f6", icon: "Cpu" },
  network: { label: "Rede", color: "#10b981", icon: "Wifi" },
  ui: { label: "Interface", color: "#8b5cf6", icon: "Layout" },
  security: { label: "Seguranca", color: "#ec4899", icon: "Lock" },
  updates: { label: "Atualizacoes", color: "#06b6d4", icon: "Download" },
};

export const TWEAKS: Tweak[] = [
  // Privacidade
  { id: "disable_telemetry", label: "Desativar telemetria do Windows", description: "Desliga a coleta de dados de diagnostico e os servicos de telemetria do Windows.", category: "privacy", risk: "low" },
  { id: "disable_cortana", label: "Desativar Cortana", description: "Desliga a Cortana e seus processos de busca em segundo plano.", category: "privacy", risk: "low" },
  { id: "disable_office_telemetry", label: "Desativar telemetria do Office", description: "Impede o Office 2016+ de enviar dados de uso e diagnostico.", category: "privacy", risk: "low" },
  { id: "disable_copilot", label: "Desativar CoPilot AI", description: "Desativa o CoPilot no Windows 11 e no Edge.", category: "privacy", risk: "low" },
  { id: "disable_activity_history", label: "Desativar Historico de Atividades", description: "Impede o Windows de coletar e sincronizar a linha do tempo de atividades.", category: "privacy", risk: "low" },
  { id: "disable_advertising_id", label: "Desativar ID de Publicidade", description: "Impede que aplicativos usem o ID de publicidade para rastreamento.", category: "privacy", risk: "low" },
  { id: "disable_location_tracking", label: "Desativar rastreamento de localizacao", description: "Desliga servicos de localizacao e o acesso de aplicativos a localizacao.", category: "privacy", risk: "medium" },
  { id: "disable_feedback_notifications", label: "Desativar notificacoes de feedback", description: "Impede o Windows de pedir feedback e exibir notificacoes de pesquisa.", category: "privacy", risk: "low" },
  { id: "disable_suggested_content", label: "Desativar conteudo sugerido", description: "Remove aplicativos sugeridos, dicas e conteudo promovido do Menu Iniciar.", category: "privacy", risk: "low" },
  { id: "disable_typing_insights", label: "Desativar insights de digitacao", description: "Impede a coleta de dados de digitacao e tinta para personalizacao.", category: "privacy", risk: "low" },

  // Desempenho
  { id: "disable_hpet", label: "Desativar HPET", description: "Desativa o High Precision Event Timer para menor latencia DPC.", category: "performance", risk: "medium" },
  { id: "disable_game_bar", label: "Desativar Game Bar", description: "Desliga os processos de gravacao em segundo plano da Xbox Game Bar.", category: "performance", risk: "low" },
  { id: "disable_game_dvr", label: "Desativar Game DVR", description: "Interrompe gravacoes do Game DVR em segundo plano que consomem recursos.", category: "performance", risk: "low" },
  { id: "disable_print_spooler", label: "Desativar Spooler de Impressao", description: "Para o servico de spooler de impressao se voce nao usa impressoras.", category: "performance", risk: "medium" },
  { id: "disable_sys_main", label: "Desativar SysMain (Superfetch)", description: "Desativa o Superfetch para reduzir o uso de disco em SSDs.", category: "performance", risk: "medium" },
  { id: "disable_windows_search", label: "Desativar indexacao do Windows Search", description: "Para a indexacao em segundo plano para reduzir I/O do disco.", category: "performance", risk: "medium" },
  { id: "power_high_performance", label: "Definir plano de energia Alto Desempenho", description: "Muda para o plano de energia de Alto Desempenho.", category: "performance", risk: "low" },
  { id: "disable_visual_effects", label: "Desativar efeitos visuais", description: "Desliga animacoes e efeitos visuais para maximo desempenho.", category: "performance", risk: "low" },
  { id: "disable_transparency", label: "Desativar efeitos de transparencia", description: "Desliga acrilico e transparencia na barra de tarefas e janelas.", category: "performance", risk: "low" },

  // Sistema
  { id: "enable_utc_time", label: "Ativar hora UTC globalmente", description: "Define o relogio de hardware para UTC para consistencia em dual-boot.", category: "system", risk: "medium" },
  { id: "disable_onedrive", label: "Desativar OneDrive", description: "Impede o OneDrive de iniciar e sincronizar automaticamente.", category: "system", risk: "medium" },
  { id: "disable_defender", label: "Desativar Windows Defender", description: "Desliga a protecao em tempo real (requer Modo de Seguranca).", category: "system", risk: "high" },
  { id: "disable_firewall", label: "Desativar Firewall do Windows", description: "Desliga o firewall integrado para todos os perfis.", category: "system", risk: "high" },
  { id: "disable_uac", label: "Desativar Controle de Conta de Usuario", description: "Reduz o UAC para nunca notificar. Diminui avisos de seguranca.", category: "system", risk: "high" },
  { id: "disable_action_center", label: "Desativar Central de Acoes", description: "Desliga a central de notificacoes e seus popups.", category: "system", risk: "low" },
  { id: "disable_lock_screen", label: "Desativar Tela de Bloqueio", description: "Pula a tela de bloqueio e vai direto para o login.", category: "system", risk: "low" },
  { id: "show_file_extensions", label: "Mostrar extensoes de arquivo", description: "Revela as extensoes de arquivo no Explorador de Arquivos.", category: "system", risk: "low" },
  { id: "show_hidden_files", label: "Mostrar arquivos ocultos", description: "Exibe arquivos e pastas ocultos no Explorador.", category: "system", risk: "low" },
  { id: "disable_auto_play", label: "Desativar AutoPlay", description: "Impede o Windows de executar midias automaticamente em unidades inseridas.", category: "system", risk: "low" },
  { id: "disable_hibernation", label: "Desativar hibernacao", description: "Remove o hiberfil.sys e libera espaco em disco.", category: "system", risk: "low" },

  // Rede
  { id: "disable_net_throttling", label: "Desativar limitacao de rede", description: "Remove o limite de throttling de rede no registro para melhor throughput.", category: "network", risk: "medium" },
  { id: "disable_ipv6", label: "Desativar IPv6", description: "Desliga o IPv6 para resolver conflitos de rede legados.", category: "network", risk: "medium" },
  { id: "enable_tcp_quick_ack", label: "Ativar TCP Quick ACK", description: "Reduz a latencia de confirmacao TCP para conexoes mais rapidas.", category: "network", risk: "medium" },
  { id: "disable_net_powersave", label: "Desativar economia de energia da rede", description: "Impede a placa de dormir para evitar desconexoes.", category: "network", risk: "low" },
  { id: "enable_dns_over_https", label: "Ativar DNS-sobre-HTTPS", description: "Roteia o DNS por HTTPS criptografado para impedir espionagem.", category: "network", risk: "low" },

  // Interface
  { id: "classic_context_menu", label: "Menu de contexto classico", description: "Restaura o menu de contexto completo no estilo do Windows 10.", category: "ui", risk: "low" },
  { id: "taskbar_left_align", label: "Alinhar barra de tarefas a esquerda", description: "Move os icones da barra de tarefas para a esquerda (Windows 11).", category: "ui", risk: "low" },
  { id: "disable_widgets", label: "Desativar Widgets", description: "Remove o botao de Widgets da barra de tarefas.", category: "ui", risk: "low" },
  { id: "disable_chat", label: "Desativar Chat (Teams)", description: "Remove o icone de Chat/Teams da barra de tarefas.", category: "ui", risk: "low" },
  { id: "classic_start", label: "Menu Iniciar classico", description: "Usa um layout de Menu Iniciar mais denso e classico.", category: "ui", risk: "low" },
  { id: "small_taskbar", label: "Icones pequenos na barra de tarefas", description: "Usa botoes pequenos na barra de tarefas para ganhar espaco vertical.", category: "ui", risk: "low" },

  // Seguranca
  { id: "disable_smb1", label: "Desativar SMBv1", description: "Remove o protocolo inseguro SMBv1 para bloquear ataques tipo EternalBlue.", category: "security", risk: "low" },
  { id: "disable_autorun", label: "Desativar AutoRun", description: "Impede que executaveis rodem automaticamente em unidades removiveis.", category: "security", risk: "low" },
  { id: "enable Controlled_folder_access", label: "Ativar Acesso Controlado a Pastas", description: "Liga a protecao contra ransomware para Documentos, Imagens, etc.", category: "security", risk: "low" },
  { id: "disable_remote_desktop", label: "Desativar Area de Trabalho Remota", description: "Desliga o RDP para reduzir a superficie de ataque remoto.", category: "security", risk: "medium" },
  { id: "disable_wscript", label: "Desativar auto-execucao do WScript", description: "Impede que scripts .vbs/.vbe sejam executados automaticamente.", category: "security", risk: "medium" },

  // Atualizacoes
  { id: "disable_auto_updates", label: "Parar atualizacoes automaticas do Windows", description: "Pausa o download e instalacao automatica de atualizacoes do Windows 10/11.", category: "updates", risk: "medium" },
  { id: "disable_update_delivery", label: "Desativar Otimizacao de Entrega", description: "Impede o envio de atualizacoes para outros PCs via P2P.", category: "updates", risk: "low" },
  { id: "disable_driver_updates", label: "Desativar atualizacoes automaticas de driver", description: "Impede o Windows de instalar atualizacoes de driver automaticamente.", category: "updates", risk: "medium" },
  { id: "disable_store_updates", label: "Desativar auto-atualizacao da Store", description: "Impede a Microsoft Store de atualizar aplicativos automaticamente.", category: "updates", risk: "low" },
];

export type CleanerTarget = {
  id: string;
  label: string;
  description: string;
  category: "system" | "browser" | "cache";
  defaultChecked: boolean;
};

export const CLEANER_TARGETS: CleanerTarget[] = [
  { id: "temp_files", label: "Arquivos temporarios", description: "Exclui arquivos nas pastas %TEMP% e Windows Temp.", category: "system", defaultChecked: true },
  { id: "windows_update_cache", label: "Cache do Windows Update", description: "Limpa o cache de download da pasta SoftwareDistribution.", category: "system", defaultChecked: true },
  { id: "thumbnails", label: "Cache de miniaturas", description: "Reconstrui o cache de miniaturas do Explorador.", category: "cache", defaultChecked: true },
  { id: "icon_cache", label: "Cache de icones", description: "Limpa e reconstrui o cache de icones do shell.", category: "cache", defaultChecked: false },
  { id: "dns_cache", label: "Cache do resolvedor DNS", description: "Limpa o cache do resolvedor DNS.", category: "cache", defaultChecked: true },
  { id: "font_cache", label: "Cache de fontes", description: "Redefine o cache de fontes do Windows.", category: "cache", defaultChecked: false },
  { id: "recycle_bin", label: "Lixeira", description: "Esvazia permanentemente a Lixeira em todas as unidades.", category: "system", defaultChecked: true },
  { id: "error_reports", label: "Relatorios de erro e logs", description: "Exclui relatorios de erro e minidumps do Windows.", category: "system", defaultChecked: true },
  { id: "delivery_optimization", label: "Arquivos da Otimizacao de Entrega", description: "Limpa o cache de arquivos da Otimizacao de Entrega.", category: "system", defaultChecked: false },
  { id: "old_windows", label: "Instalacao antiga do Windows", description: "Remove o Windows.old apos uma atualizacao de recurso.", category: "system", defaultChecked: false },
  { id: "chrome_cache", label: "Cache do Chrome", description: "Limpa cache e cookies do Chrome.", category: "browser", defaultChecked: true },
  { id: "chrome_history", label: "Historico do Chrome", description: "Limpa o historico de navegacao no Chrome.", category: "browser", defaultChecked: false },
  { id: "edge_cache", label: "Cache do Edge", description: "Limpa cache e cookies do Edge.", category: "browser", defaultChecked: true },
  { id: "edge_history", label: "Historico do Edge", description: "Limpa o historico de navegacao no Edge.", category: "browser", defaultChecked: false },
  { id: "firefox_cache", label: "Cache do Firefox", description: "Limpa cache e cookies do Firefox.", category: "browser", defaultChecked: false },
  { id: "firefox_history", label: "Historico do Firefox", description: "Limpa o historico de navegacao no Firefox.", category: "browser", defaultChecked: false },
];

export type AppInfo = {
  id: string;
  name: string;
  publisher: string;
  description: string;
  category: string;
  icon: string;
  size: string;
};

export const USEFUL_APPS: AppInfo[] = [
  { id: "chrome", name: "Google Chrome", publisher: "Google", description: "Navegador web rapido e seguro.", category: "Navegadores", icon: "Globe", size: "95 MB" },
  { id: "firefox", name: "Mozilla Firefox", publisher: "Mozilla", description: "Navegador de codigo aberto focado em privacidade.", category: "Navegadores", icon: "Globe", size: "55 MB" },
  { id: "brave", name: "Brave Browser", publisher: "Brave Software", description: "Navegador com bloqueador de anuncios integrado.", category: "Navegadores", icon: "Globe", size: "120 MB" },
  { id: "edge", name: "Microsoft Edge", publisher: "Microsoft", description: "Navegador baseado em Chromium integrado ao Windows.", category: "Navegadores", icon: "Globe", size: "160 MB" },
  { id: "7zip", name: "7-Zip", publisher: "Igor Pavlov", description: "Compactador de arquivos de codigo aberto com alta taxa de compressao.", category: "Utilitarios", icon: "Archive", size: "1.5 MB" },
  { id: "notepadpp", name: "Notepad++", publisher: "Don Ho", description: "Editor de codigo-fonte rapido.", category: "Utilitarios", icon: "FileText", size: "4.2 MB" },
  { id: "vscode", name: "Visual Studio Code", publisher: "Microsoft", description: "Editor de codigo gratuito e extensivel.", category: "Desenvolvimento", icon: "Code", size: "90 MB" },
  { id: "git", name: "Git", publisher: "Git Foundation", description: "Sistema de controle de versao distribuido.", category: "Desenvolvimento", icon: "GitBranch", size: "55 MB" },
  { id: "python", name: "Python", publisher: "Python Software Foundation", description: "Runtime Python e gerenciador de pacotes.", category: "Desenvolvimento", icon: "Terminal", size: "28 MB" },
  { id: "nodejs", name: "Node.js LTS", publisher: "OpenJS Foundation", description: "Runtime JavaScript e npm.", category: "Desenvolvimento", icon: "Hexagon", size: "30 MB" },
  { id: "vlc", name: "VLC media player", publisher: "VideoLAN", description: "Reproduz qualquer formato de video ou audio.", category: "Midia", icon: "Play", size: "42 MB" },
  { id: "spotify", name: "Spotify", publisher: "Spotify AB", description: "Transmita musicas e podcasts.", category: "Midia", icon: "Music", size: "130 MB" },
  { id: "discord", name: "Discord", publisher: "Discord Inc.", description: "Chat de voz, video e texto.", category: "Comunicacao", icon: "MessageCircle", size: "85 MB" },
  { id: "steam", name: "Steam", publisher: "Valve", description: "Loja de jogos e inicializador.", category: "Jogos", icon: "Gamepad2", size: "3 MB" },
  { id: "obs", name: "OBS Studio", publisher: "OBS Project", description: "Software gratuito de streaming e gravacao.", category: "Midia", icon: "Video", size: "120 MB" },
  { id: "sharex", name: "ShareX", publisher: "ShareX Team", description: "Ferramenta de captura de tela e gravacao.", category: "Utilitarios", icon: "Camera", size: "8 MB" },
];

export type UwpApp = {
  id: string;
  name: string;
  publisher: string;
  installed: string;
  size: string;
};

export const UWP_APPS: UwpApp[] = [
  { id: "bingnews", name: "Microsoft Bing News", publisher: "Microsoft Corporation", installed: "2023-09-14", size: "28 MB" },
  { id: "bingweather", name: "Microsoft Bing Weather", publisher: "Microsoft Corporation", installed: "2023-09-14", size: "32 MB" },
  { id: "bingsports", name: "Microsoft Bing Sports", publisher: "Microsoft Corporation", installed: "2023-09-14", size: "24 MB" },
  { id: "money", name: "Microsoft Money", publisher: "Microsoft Corporation", installed: "2023-09-14", size: "30 MB" },
  { id: "solitaire", name: "Microsoft Solitaire Collection", publisher: "Microsoft Studios", installed: "2023-10-02", size: "180 MB" },
  { id: "xbox", name: "Xbox", publisher: "Microsoft Corporation", installed: "2023-10-02", size: "210 MB" },
  { id: "yourphone", name: "Your Phone", publisher: "Microsoft Corporation", installed: "2023-09-14", size: "95 MB" },
  { id: "maps", name: "Windows Maps", publisher: "Microsoft Corporation", installed: "2023-09-14", size: "65 MB" },
  { id: "voice_recorder", name: "Windows Voice Recorder", publisher: "Microsoft Corporation", installed: "2023-09-14", size: "18 MB" },
  { id: "3dviewer", name: "3D Viewer", publisher: "Microsoft Corporation", installed: "2023-09-14", size: "45 MB" },
  { id: "paint3d", name: "Paint 3D", publisher: "Microsoft Corporation", installed: "2023-09-14", size: "120 MB" },
  { id: "office", name: "My Office", publisher: "Microsoft Corporation", installed: "2023-09-14", size: "12 MB" },
  { id: "feedback", name: "Feedback Hub", publisher: "Microsoft Corporation", installed: "2023-09-14", size: "38 MB" },
  { id: "tips", name: "Microsoft Tips", publisher: "Microsoft Corporation", installed: "2023-09-14", size: "22 MB" },
  { id: "gethelp", name: "Get Help", publisher: "Microsoft Corporation", installed: "2023-09-14", size: "16 MB" },
  { id: "clipchamp", name: "Clipchamp", publisher: "Microsoft Corporation", installed: "2023-10-02", size: "95 MB" },
];

export type StartupItem = {
  id: string;
  name: string;
  publisher: string;
  command: string;
  impact: "low" | "medium" | "high";
  enabled: boolean;
};

export const STARTUP_ITEMS: StartupItem[] = [
  { id: "s1", name: "Microsoft OneDrive", publisher: "Microsoft Corporation", command: '"C:\\Users\\user\\AppData\\Local\\Microsoft\\OneDrive\\OneDrive.exe" /background', impact: "medium", enabled: true },
  { id: "s2", name: "Spotify", publisher: "Spotify AB", command: '"C:\\Users\\user\\AppData\\Roaming\\Spotify\\Spotify.exe" --autostart', impact: "medium", enabled: true },
  { id: "s3", name: "Discord", publisher: "Discord Inc.", command: '"C:\\Users\\user\\AppData\\Local\\Discord\\Update.exe" --processStart Discord', impact: "low", enabled: true },
  { id: "s4", name: "Microsoft Teams", publisher: "Microsoft Corporation", command: '"C:\\Users\\user\\AppData\\Local\\Microsoft\\Teams\\Teams.exe"', impact: "high", enabled: true },
  { id: "s5", name: "Skype", publisher: "Microsoft Corporation", command: '"C:\\Program Files\\Microsoft\\Skype\\Skype.exe" /minimized', impact: "high", enabled: false },
  { id: "s6", name: "Steam", publisher: "Valve Corporation", command: '"C:\\Program Files (x86)\\Steam\\steam.exe" -silent', impact: "medium", enabled: true },
  { id: "s7", name: "Epic Games Launcher", publisher: "Epic Games", command: '"C:\\Program Files (x86)\\Epic Games\\Launcher\\EpicGamesLauncher.exe" -silent', impact: "high", enabled: false },
  { id: "s8", name: "NVIDIA GeForce Experience", publisher: "NVIDIA Corporation", command: '"C:\\Program Files\\NVIDIA Corporation\\NVIDIA GeForce Experience\\NVIDIA GeForce Experience.exe"', impact: "medium", enabled: true },
  { id: "s9", name: "Adobe Creative Cloud", publisher: "Adobe Inc.", command: '"C:\\Program Files\\Adobe\\Adobe Creative Cloud\\ACC\\Creative Cloud.exe"', impact: "high", enabled: false },
  { id: "s10", name: "Razer Synapse", publisher: "Razer Inc.", command: '"C:\\Program Files\\Razer\\Synapse3\\RazerSynapse.exe"', impact: "medium", enabled: true },
];

export type DnsServer = {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  note: string;
};

export const DNS_SERVERS: DnsServer[] = [
  { id: "dhcp", name: "Automatico (DHCP)", primary: "—", secondary: "—", note: "Obter DNS automaticamente do roteador." },
  { id: "google", name: "Google Public DNS", primary: "8.8.8.8", secondary: "8.8.4.4", note: "Rapido, confiavel, anycast global." },
  { id: "cloudflare", name: "Cloudflare (1.1.1.1)", primary: "1.1.1.1", secondary: "1.0.0.1", note: "Foco em privacidade, sem logs." },
  { id: "cloudflare_family", name: "Cloudflare Familia", primary: "1.1.1.3", secondary: "1.0.0.3", note: "Bloqueia malware + conteudo adulto." },
  { id: "quad9", name: "Quad9", primary: "9.9.9.9", secondary: "149.112.112.112", note: "Bloqueia dominios maliciosos conhecidos." },
  { id: "opendns", name: "OpenDNS Home", primary: "208.67.222.222", secondary: "208.67.220.220", note: "Filtragem personalizavel." },
  { id: "adguard", name: "AdGuard DNS", primary: "94.140.14.14", secondary: "94.140.15.15", note: "Bloqueia anuncios e rastreadores no nivel de DNS." },
  { id: "controld", name: "Control D Free", primary: "76.76.2.0", secondary: "76.76.10.0", note: "Bloqueio e redirecionamento personalizaveis." },
];

export type HardwareInfo = {
  label: string;
  value: string;
  icon: string;
};

export const HARDWARE_INFO: HardwareInfo[] = [
  { label: "Sistema Operacional", value: "Windows 11 Pro 23H2 (Build 22631.3880)", icon: "Monitor" },
  { label: "Processador", value: "Intel Core i7-13700K (16 nucleos, 24 threads)", icon: "Cpu" },
  { label: "Memoria", value: "32.0 GB DDR5-6000 (31.9 GB utilizaveis)", icon: "MemoryStick" },
  { label: "Grafica", value: "NVIDIA GeForce RTX 4070 (12 GB GDDR6X)", icon: "Cpu" },
  { label: "Armazenamento", value: "Samsung 990 PRO 2TB NVMe SSD", icon: "HardDrive" },
  { label: "Placa-mae", value: "ASUS ROG STRIX Z790-A", icon: "CircuitBoard" },
  { label: "Rede", value: "Intel Ethernet Controller I225-V (2.5 GbE)", icon: "Wifi" },
  { label: "BIOS", value: "American Megatrends v2803 (2024-06-18)", icon: "CircuitBoard" },
];

export type ProcessInfo = {
  id: string;
  name: string;
  pid: number;
  cpu: number;
  memory: number;
  type: string;
};

export const PROCESS_LIST: ProcessInfo[] = [
  { id: "p1", name: "chrome.exe", pid: 4892, cpu: 8.4, memory: 1820, type: "Aplicativo" },
  { id: "p2", name: "Code.exe", pid: 12784, cpu: 3.1, memory: 940, type: "Aplicativo" },
  { id: "p3", name: "explorer.exe", pid: 6784, cpu: 0.4, memory: 180, type: "Sistema" },
  { id: "p4", name: "svchost.exe", pid: 944, cpu: 0.2, memory: 220, type: "Sistema" },
  { id: "p5", name: "System", pid: 4, cpu: 0.1, memory: 95, type: "Sistema" },
  { id: "p6", name: "MsMpEng.exe", pid: 2416, cpu: 2.7, memory: 310, type: "Servico" },
  { id: "p7", name: "node.exe", pid: 15432, cpu: 1.8, memory: 260, type: "Aplicativo" },
  { id: "p8", name: "OneDrive.exe", pid: 8920, cpu: 0.3, memory: 140, type: "Aplicativo" },
  { id: "p9", name: "Spotify.exe", pid: 11200, cpu: 0.6, memory: 320, type: "Aplicativo" },
  { id: "p10", name: "Discord.exe", pid: 13888, cpu: 1.2, memory: 410, type: "Aplicativo" },
];
