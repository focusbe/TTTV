using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading;
using System.Net;
using System.Net.Sockets;
using System.Text;

namespace XLDemo
{

    public class AppTCPServer
    {
        public AppTCPServer(string localIP, int port)
        {
            Socket socket = new Socket(AddressFamily.InterNetwork,
                                                        SocketType.Stream,
                                                        ProtocolType.Tcp);
            EndPoint localEP = new IPEndPoint(IPAddress.Parse(localIP), port);
            socket.Bind(localEP);
            socket.Listen(100);
            socket.BeginAccept(AcceptAsync, socket);
        }

        private void AcceptAsync(IAsyncResult ar)
        {
            Socket socket = ar.AsyncState as Socket;
            try
            {
                Socket client = socket.EndAccept(ar);
                Console.WriteLine("客户端请求链接！客户端：{0}", client.RemoteEndPoint.ToString());
                if (OnConnected != null)
                {
                    Console.WriteLine("链接成功");
                    OnConnected(this, new ClientConnectedEventArgs(client));
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("AcceptAsync发生异常，异常信息:\n{0}", e.Message);
            }
            finally
            {
                //继续异步Accept
                socket.BeginAccept(AcceptAsync, socket);
            }
        }

        //客户端连接后的事件 OnConnect
        public event EventHandler<ClientConnectedEventArgs> OnConnected;
    }

    /// <summary>
    /// 事件参数：接收客户端连接后的事件参数
    /// </summary>
    public class ClientConnectedEventArgs : EventArgs
    {
        public ClientConnectedEventArgs(Socket clientSocket)
        {
            ClientSocket = clientSocket;
        }
        public Socket ClientSocket { get; private set; }
    }

    static class Program
    {
        /// <summary>
        /// 应用程序的主入口点。
        /// </summary>
        static XL.DownTaskInfo info = new XL.DownTaskInfo();
        static IntPtr a;
        static void Main(string[] args)
        {
            AppTCPServer server = new AppTCPServer("127.0.0.1", 6801);
            server.OnConnected += server_OnConnected;
            Console.WriteLine("按任意键结束程序……");
            Console.ReadKey();
            return;
            int ctr = 0;
            if (args.Length <= 0)
            {
                Console.WriteLine("{'status':'-9',msg:'no args'}");
                return;
            }
            else
            {
                Dictionary<String, String> pList = new Dictionary<String, String>();
                for (ctr = 0; ctr < args.Length; ctr++)
                {
                    //Console.WriteLine("Argument {0} is {1}", ctr + 1, args[ctr]);
                    try
                    {
                        string[] sArray = Regex.Split(args[ctr], "=");
                        pList.Add(sArray[0], sArray[1]);
                    }
                    catch {
                        Console.WriteLine("解析参数失败");
                    }
                    
                }
                if (pList.ContainsKey("action"))
                {
                    switch (pList["action"])
                    {
                        case "download":
                            if (pList.ContainsKey("url") && pList["url"] != null)
                            {
                                String fileurl = pList["url"];

                                var initSuccess = XL.XL_Init();
                                if (initSuccess)
                                {
                                    XL.DownTaskParam p = new XL.DownTaskParam()
                                    {
                                        szTaskUrl = fileurl,
                                        szFilename = pList["filename"],
                                        szSavePath = pList["path"]
                                    };
                                    a = XL.XL_CreateTask(p);
                                    try{
                                        var startSuccess = XL.XL_StartTask(a);
                                        if (startSuccess)
                                        {
                                            Console.WriteLine("{'status':'1',msg:'start download " + pList["filename"] + "'}");
                                            for (int i = 0; i < 100; i = 0)
                                            {
                                                getPercent();
                                                Thread.Sleep(1000);                    //停一秒
                                            }
                                        }
                                        else
                                        {
                                            Console.WriteLine("{'status':'-3',msg:'start failed'}");
                                        }
                                    }
                                    catch {
                                        Console.WriteLine("{'status':'-4',msg:'download error'}");
                                    }
                                    
                                }
                                else
                                {
                                    Console.WriteLine("{'status':'-2',msg:'xlinit failed'}");
                                }
                            }
                            else
                            {
                                Console.WriteLine("{'status':'-1',msg:'no url'}");
                            }
                            break;
                    }
                }
                else {
                    Console.WriteLine("{'status':'-1',msg:'no action'}");
                }
                string inputNumber;
                inputNumber = Console.ReadLine();
            }
        }

        static void server_OnConnected(object sender, ClientConnectedEventArgs e)
        {
            Socket client = e.ClientSocket;
            string hello = "Hello from AppTCPServer";
            client.Send(Encoding.Default.GetBytes(hello));
        }

        static void addTask() {

        }

        static void getPercent() {
            var qq = XL.XL_QueryTaskInfoEx(a, info);
            int percent = (int)(info.fPercent * 100);
            var aa = "{"+string.Format("percent:{0},speed:{1},state:{2}", info.fPercent, info.nSpeed, info.stat)+"}";
            Console.WriteLine(aa);
        }
    }
}
