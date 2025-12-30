
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Globe, 
  Layers, 
  Heart, 
  ChevronDown, 
  ArrowUpRight, 
  BarChart3,
  Award,
  Download,
  Info,
  CheckCircle2
} from 'lucide-react';

// --- 数据常量 ---
const FINANCIALS = [
  { label: '收入', value: '13,037.7', growth: '+106.9%', unit: '百万人民币' },
  { label: '毛利', value: '8,707.8', growth: '+125.4%', unit: '百万人民币' },
  { label: '经营溢利', value: '4,154.3', growth: '+237.6%', unit: '百万人民币' },
  { label: '经调整净利', value: '3,403.2', growth: '+185.9%', unit: '百万人民币' },
];

const MAJOR_IPS = [
  { name: 'THE MONSTERS', revenue: '3,040.7', growth: '726.6%', color: 'bg-yellow-400' },
  { name: 'MOLLY', revenue: '2,093.2', growth: '105.2%', color: 'bg-blue-400' },
  { name: 'SKULLPANDA', revenue: '1,308.3', growth: '27.7%', color: 'bg-stone-800' },
  { name: 'CRYBABY', revenue: '1,164.9', growth: '1537.2%', color: 'bg-pink-400' },
];

const App: React.FC = () => {
  const [showHint, setShowHint] = useState(false);

  const handleDownload = () => {
    setShowHint(true);
    // 给用户 2 秒时间阅读提示，确保界面状态稳定后调起打印
    setTimeout(() => {
      window.print();
    }, 1500);
  };

  return (
    <div className="relative bg-white font-sans selection:bg-pmred selection:text-white overflow-x-hidden print:overflow-visible">
      {/* 核心打印修复样式 */}
      <style>{`
        @media print {
          @page { 
            size: A4; 
            margin: 0; 
          }
          html, body {
            height: auto !important;
            overflow: visible !important;
            background: white !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          /* 强制显示所有动画元素，防止因未触发动画导致的空白 */
          * {
            opacity: 1 !important;
            visibility: visible !important;
            transform: none !important;
            transition: none !important;
            animation: none !important;
          }
          section {
            display: block !important;
            page-break-after: always !important;
            break-after: page !important;
            height: auto !important;
            min-height: 100vh !important;
            position: relative !important;
            padding: 4rem 2rem !important;
          }
          .print-hidden, nav, button, .scroll-hint {
            display: none !important;
          }
          .bg-stone-950 { background-color: #0c0c0c !important; color: white !important; }
          .bg-pmred { background-color: #E51919 !important; color: white !important; }
          .bg-stone-50 { background-color: #f8fafc !important; }
          /* 容器宽度修正 */
          .container {
            max-width: 100% !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
          }
        }
      `}</style>

      {/* 导航栏 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-100 py-4 px-6 print:hidden">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-pmred text-white font-black px-2 py-1 text-sm tracking-tighter">POP MART</div>
            <span className="font-serif font-bold text-lg hidden sm:inline">2024年度报告</span>
          </div>
          <div className="flex items-center gap-8">
            <div className="hidden lg:flex gap-6 text-xs font-bold uppercase tracking-widest text-stone-500">
              {['概览', '财务', 'IP宇宙', '全球', '愿景'].map((item, i) => (
                <button 
                  key={i} 
                  onClick={() => document.getElementById(`section-${i}`)?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-pmred transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
            <button 
              onClick={handleDownload}
              className="group flex items-center gap-2 bg-pmred hover:bg-pmred-dark text-white px-5 py-2.5 rounded-full text-xs font-bold transition-all active:scale-95 shadow-lg shadow-pmred/20"
            >
              <Download size={14} className="group-hover:translate-y-0.5 transition-transform" />
              下载完整报告 (PDF)
            </button>
          </div>
        </div>
      </nav>

      {/* 下载提示弹出层 */}
      <AnimatePresence>
        {showHint && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-stone-900/60 backdrop-blur-md print:hidden"
            onClick={() => setShowHint(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white p-8 rounded-[2rem] shadow-2xl max-w-md w-full border border-stone-100"
              onClick={e => e.stopPropagation()}
            >
              <div className="bg-pmred/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto text-pmred">
                <Info size={32} />
              </div>
              <h3 className="text-2xl font-bold text-center mb-4">准备生成 PDF</h3>
              <div className="space-y-4 text-stone-600 text-sm leading-relaxed mb-8">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-stone-100 rounded-full flex items-center justify-center font-bold text-stone-900">1</span>
                  <p>即将自动打开打印预览，请等待加载完成。</p>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-stone-100 rounded-full flex items-center justify-center font-bold text-stone-900">2</span>
                  <p>在“目标打印机”中选择 <span className="font-bold text-pmred">“另存为 PDF”</span>。</p>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-stone-100 rounded-full flex items-center justify-center font-bold text-stone-900">3</span>
                  <p>如果预览只有一页，请确保勾选了 <span className="font-bold">“背景图形”</span> 选项。</p>
                </div>
              </div>
              <button 
                onClick={() => setShowHint(false)}
                className="w-full py-4 bg-stone-900 text-white rounded-2xl font-bold hover:bg-stone-800 transition-colors"
              >
                好的，开始下载
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page 1: Hero */}
      <section id="section-0" className="min-h-screen flex items-center justify-center bg-grid relative pt-20">
        <div className="container px-6 mx-auto text-center relative z-10">
          <div className="inline-block mb-6 px-4 py-1.5 border-2 border-stone-900 font-black text-xs uppercase tracking-[0.3em] rounded-full">
            Stock Code: 9992.HK
          </div>
          <h1 className="font-serif text-[12vw] sm:text-[10rem] leading-[0.8] font-black text-stone-950 mb-12">
            2024<br/>
            <span className="text-pmred">ANNUAL</span><br/>
            REPORT
          </h1>
          <div className="max-w-xl mx-auto">
            <p className="text-xl text-stone-600 font-light mb-8 leading-relaxed">
              泡泡玛特国际集团有限公司 2024 年度亮点回顾：引领全球潮流文化，实现跨越式增长。
            </p>
          </div>
        </div>
      </section>

      {/* Page 2: Financials */}
      <section id="section-1" className="min-h-screen py-32 bg-stone-950 text-white relative overflow-hidden flex items-center">
        <div className="container px-6 mx-auto relative z-10">
          <div className="mb-16">
            <h2 className="font-serif text-5xl md:text-7xl font-bold mb-4">超越预期的业绩</h2>
            <div className="h-1 w-24 bg-pmred" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FINANCIALS.map((stat, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 print:border-stone-800">
                <p className="text-stone-400 text-xs font-bold uppercase tracking-widest mb-4">{stat.label}</p>
                <div className="text-5xl font-black mb-1">{stat.value}</div>
                <div className="text-stone-500 text-xs mb-6 uppercase">{stat.unit}</div>
                <div className="flex items-center text-pmred text-2xl font-black">
                  <ArrowUpRight size={24} className="mr-1" />
                  {stat.growth}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 p-8 bg-pmred rounded-3xl flex flex-col md:flex-row justify-between items-center gap-8 print:border-2 print:border-pmred print:bg-white print:text-pmred">
            <div className="text-center md:text-left">
              <div className="text-white/80 text-sm font-bold uppercase tracking-widest mb-2 print:text-pmred">毛利率大幅提升</div>
              <div className="text-6xl font-black">66.8%</div>
            </div>
            <p className="text-white/90 max-w-md text-lg leading-relaxed print:text-stone-800">
              得益于供应链优化及高效运营，我们在保持高速增长的同时，利润质量得到显著提升。
            </p>
          </div>
        </div>
      </section>

      {/* Page 3: IPs */}
      <section id="section-2" className="min-h-screen py-32 bg-white relative flex items-center">
        <div className="container px-6 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <h2 className="font-serif text-5xl md:text-7xl font-bold mb-2 text-stone-900">IP 引擎</h2>
              <p className="text-stone-500 font-medium">核心 IP 首次集体进入“10 亿元俱乐部”</p>
            </div>
            <div className="text-pmred font-black text-4xl italic">BILLION CLUB</div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {MAJOR_IPS.map((ip, i) => (
              <div 
                key={i}
                className="group relative h-64 rounded-[2rem] overflow-hidden bg-stone-50 border border-stone-100 p-8 flex flex-col justify-end shadow-sm"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 ${ip.color} opacity-20 blur-3xl`} />
                <div className="relative z-10">
                  <h3 className="text-4xl font-black text-stone-900 mb-2">{ip.name}</h3>
                  <div className="flex items-center gap-4">
                    <div>
                      <span className="text-xs font-bold text-stone-400 block uppercase tracking-tighter">2024 营收</span>
                      <span className="text-2xl font-bold text-stone-900">RMB {ip.revenue}M</span>
                    </div>
                    <div className="w-px h-8 bg-stone-200" />
                    <div>
                      <span className="text-xs font-bold text-stone-400 block uppercase tracking-tighter">同比增长</span>
                      <span className="text-2xl font-bold text-pmred">+{ip.growth}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Page 4: Global */}
      <section id="section-3" className="min-h-screen py-32 bg-stone-50 relative overflow-hidden flex items-center">
        <div className="container px-6 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1 bg-pmred text-white text-xs font-bold uppercase rounded-full mb-6">
                <Globe size={14}/> 全球扩张
              </div>
              <h2 className="font-serif text-5xl md:text-7xl font-bold mb-8 text-stone-950">深耕国际市场</h2>
              <p className="text-xl text-stone-600 mb-12 leading-relaxed">
                港澳台及海外业务保持高速增长态势，收入占比提升至 38.9%。在越南、印尼、菲律宾、意大利及西班牙开设首家线下门店。
              </p>
              
              <div className="space-y-6">
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-stone-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-stone-500 uppercase tracking-wider text-xs">海外营收增长</span>
                    <span className="text-pmred font-black">+375.2%</span>
                  </div>
                  <div className="w-full bg-stone-100 h-3 rounded-full overflow-hidden">
                    <div className="bg-pmred h-full w-full" />
                  </div>
                </div>
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-stone-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-stone-500 uppercase tracking-wider text-xs">全球门店数</span>
                    <span className="text-stone-900 font-black">531 家</span>
                  </div>
                  <div className="w-full bg-stone-100 h-3 rounded-full overflow-hidden">
                    <div className="bg-stone-900 h-full w-3/4" />
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden lg:block relative print:hidden">
              <div className="aspect-square bg-white rounded-[3rem] overflow-hidden border border-stone-200 shadow-xl flex items-center justify-center p-12">
                 <div className="text-center">
                    <Globe size={120} className="text-pmred mb-8 mx-auto" />
                    <div className="text-4xl font-black text-stone-950 mb-2 tracking-tighter uppercase">5 Countries</div>
                    <div className="text-stone-500 font-bold uppercase tracking-widest text-sm">New Markets Entered in 2024</div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Page 5: Vision */}
      <section id="section-4" className="min-h-screen py-32 bg-white flex flex-col justify-center items-center">
        <div className="container px-6 mx-auto text-center">
          <Award size={64} className="text-pmred mb-12 mx-auto" />
          <div className="max-w-4xl mx-auto mb-20">
            <p className="font-serif text-3xl md:text-5xl font-bold leading-tight mb-8 text-stone-900">
              “我们将继续坚持‘向上生长’，期待有一天能够真正成为‘世界的泡泡玛特’。”
            </p>
            <cite className="text-stone-500 text-lg font-bold uppercase tracking-widest block">— 王宁，董事长兼 CEO</cite>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-10 bg-stone-50 rounded-[2.5rem] border border-stone-100 shadow-sm">
              <Heart className="text-pmred mb-6 mx-auto" />
              <div className="text-4xl font-black text-stone-950 mb-2">13 间</div>
              <p className="text-stone-500 text-sm font-bold uppercase tracking-wider">公益美育中心</p>
            </div>
            <div className="p-10 bg-stone-50 rounded-[2.5rem] border border-stone-100 shadow-sm">
              <Layers className="text-pmred mb-6 mx-auto" />
              <div className="text-4xl font-black text-stone-950 mb-2">6,273 名</div>
              <p className="text-stone-500 text-sm font-bold uppercase tracking-wider">全球员工团队</p>
            </div>
            <div className="p-10 bg-stone-50 rounded-[2.5rem] border border-stone-100 shadow-sm">
              <BarChart3 className="text-pmred mb-6 mx-auto" />
              <div className="text-4xl font-black text-stone-950 mb-2">92.7%</div>
              <p className="text-stone-500 text-sm font-bold uppercase tracking-wider">会员销售贡献</p>
            </div>
          </div>
        </div>
        
        <footer className="mt-32 w-full py-12 border-t border-stone-100 text-center">
          <div className="bg-pmred text-white font-black px-4 py-2 text-xl inline-block mb-6">POP MART</div>
          <p className="text-stone-400 text-xs font-bold uppercase tracking-[0.2em]">© 2024 POP MART INTERNATIONAL GROUP LIMITED. ALL RIGHTS RESERVED.</p>
        </footer>
      </section>
    </div>
  );
};

export default App;
