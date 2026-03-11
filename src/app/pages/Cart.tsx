import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  Plus,
  Minus,
  Trash2,
  TrendingUp,
  Package,
  Zap,
  CheckCircle2,
  ShoppingCart,
  Lock,
  Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import clsx from 'clsx';
import { assets } from '../assets';
import { SEO } from '../components/SEO';

interface CartItem {
  id: string;
  name: string;
  price: string;
  gameId: string;
  icon?: string;
  quantity: number;
  features?: string[];
}

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('avixnode_cart') || '[]');
    
    // Group items by name and add quantity
    const groupedCart = savedCart.reduce((acc: CartItem[], item: CartItem) => {
      const existing = acc.find(i => i.name === item.name);
      if (existing) {
        existing.quantity += 1;
      } else {
        acc.push({
          ...item,
          quantity: 1,
          features: [
            'Instant Setup',
            'DDoS Protection',
            '99.9% Uptime',
            '24/7 Support'
          ]
        });
      }
      return acc;
    }, []);
    
    setCartItems(groupedCart);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    const expandedCart = cartItems.flatMap(item =>
      Array(item.quantity).fill({ ...item, quantity: 1 })
    );
    localStorage.setItem('avixnode_cart', JSON.stringify(expandedCart));
  }, [cartItems]);

  // Update quantity
  const updateQuantity = (itemId: string, change: number) => {
    setCartItems(items =>
      items.map(item => {
        if (item.id !== itemId) return item;
        
        let newQuantity = item.quantity + change;
        
        // Enforce limits
        if (item.name === 'Extra RAM') {
          newQuantity = Math.min(10, Math.max(1, newQuantity));
          if (newQuantity === 10 && change > 0) {
            toast.error('Maximum 10 units of Extra RAM allowed');
          }
        } else if (item.name === 'Priority Support') {
          newQuantity = Math.min(1, Math.max(1, newQuantity));
          if (newQuantity === 1 && change > 0) {
            toast.error('Only 1 unit of Priority Support allowed');
          }
        } else {
          newQuantity = Math.max(1, newQuantity);
        }
        
        return { ...item, quantity: newQuantity };
      }).filter(item => item.quantity > 0)
    );
  };

  // Remove item
  const removeItem = (itemId: string) => {
    setCartItems(items => items.filter(item => item.id !== itemId));
  };

  // Add addon to cart
  const addAddon = (addon: { name: string, price: string, icon: string }) => {
    // Check if this addon already exists in the cart
    const exists = cartItems.find(item => item.name === addon.name);
    
    if (exists) {
      toast.error(`${addon.name} is already in your cart!`);
      return;
    }

    const newAddon: CartItem = {
      id: `addon-${Date.now()}`,
      name: addon.name,
      price: addon.price,
      gameId: 'addon',
      icon: addon.icon,
      quantity: 1,
      features: ['One-click activation']
    };
    
    setCartItems(prev => [...prev, newAddon]);
    toast.success(`${addon.name} added to your cart!`);
  };

  // Calculate totals
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace('₹', '').replace(',', ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const total = subtotal;

  // Redirect to Paymenter
  const handleCheckout = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate brief processing before redirect
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Redirecting to secure checkout...');
      
      // Redirect to the billing portal
      setTimeout(() => {
        localStorage.removeItem('avixnode_cart');
        window.location.href = 'https://billing.avixnode.in/';
      }, 800);
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Failed to proceed to checkout. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden transition-colors duration-800">
      <SEO 
        title="Your Shopping Cart"
        description="Review your game server hosting items and proceed to checkout. Secure and instant deployment at AvixNode."
      />
      {/* Animated Background Gradient */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Noise Texture */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        backgroundRepeat: 'repeat',
      }} />

      <div className="relative z-10 py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10 md:mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-teal-500/20 to-purple-500/20 border border-teal-500/30 mb-4 md:mb-6"
            >
              <ShoppingCart className="w-8 h-8 md:w-10 md:h-10 text-teal-500 dark:text-teal-400" />
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-foreground via-teal-500 to-foreground bg-clip-text text-transparent transition-colors duration-800">
                Your Cart
              </span>
            </h1>
            
            <p className="text-muted-foreground text-base md:text-lg transition-colors duration-800">
              {cartItems.length} {cartItems.length === 1 ? 'server' : 'servers'} ready to deploy
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Cart Items - Left Column (2/3 width) */}
            <div className="lg:col-span-2 space-y-4 md:space-y-6">
              <AnimatePresence mode="popLayout">
                {cartItems.length === 0 ? (
                  // Empty Cart State
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="relative group"
                  >
                    <div className="relative rounded-2xl md:rounded-3xl border border-border bg-card backdrop-blur-xl p-8 md:p-16 text-center overflow-hidden transition-colors duration-800">
                      <div className="relative z-10">
                        <motion.div
                          animate={{
                            y: [0, -10, 0],
                            rotate: [0, 5, -5, 0]
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 md:mb-8 rounded-full bg-gradient-to-br from-teal-500/10 to-purple-500/10 border border-teal-500/20 flex items-center justify-center"
                        >
                          <Package className="w-12 h-12 md:w-16 md:h-16 text-teal-500 dark:text-teal-400/50" />
                        </motion.div>
                        
                        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 transition-colors duration-800">
                          Your cart is empty
                        </h3>
                        <p className="text-muted-foreground text-sm md:text-base mb-8 max-w-md mx-auto transition-colors duration-800 px-4">
                          Looks like you haven't added any game servers yet.
                          Let's get you started with premium hosting!
                        </p>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => navigate('/games')}
                          className="group inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 rounded-full bg-gradient-to-r from-teal-600 to-teal-500 text-white font-bold shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 transition-all !min-h-0 !min-w-0"
                        >
                          <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
                          Browse Game Servers
                          <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  // Cart Items List
                  cartItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50, height: 0 }}
                      transition={{
                        delay: index * 0.05,
                        layout: { type: "spring", damping: 25 }
                      }}
                      className="relative group"
                    >
                      <div className="relative rounded-xl md:rounded-2xl border border-border bg-card backdrop-blur-xl overflow-hidden transition-colors duration-800">
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/5 to-transparent"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '100%' }}
                          transition={{ duration: 0.6, ease: "easeInOut" }}
                        />
                        
                        <div className="relative z-10 p-4 sm:p-6">
                          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left">
                            <motion.div
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gradient-to-br from-teal-500/20 to-purple-500/20 border border-teal-500/30 p-2 backdrop-blur-sm flex items-center justify-center"
                            >
                              {item.gameId === 'addon' ? (
                                <span className="text-3xl sm:text-4xl">{item.icon}</span>
                              ) : (
                                <img
                                  src={item.icon || assets.imgMinecraft}
                                  alt={item.name}
                                  className="w-full h-full object-contain drop-shadow-lg"
                                />
                              )}
                            </motion.div>
                            
                            <div className="flex-1 min-w-0 w-full">
                              <div className="flex items-start justify-between mb-3 gap-2">
                                <div className="min-w-0 flex-1">
                                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1 truncate transition-colors duration-800">
                                    {item.name}
                                  </h3>
                                  <p className="text-muted-foreground text-xs sm:text-sm transition-colors duration-800">
                                    Game Server Hosting
                                  </p>
                                </div>
                                
                                <motion.button
                                  whileHover={{ scale: 1.1, rotate: 90 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => removeItem(item.id)}
                                  className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 dark:text-red-400 hover:bg-red-500/20 hover:border-red-500/30 transition-all flex items-center justify-center !min-h-0 !min-w-0"
                                >
                                  <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                                </motion.button>
                              </div>

                              <div className="flex flex-wrap justify-center sm:justify-start gap-1.5 sm:gap-2 mb-4">
                                {item.features?.slice(0, 3).map((feature, idx) => (
                                  <span
                                    key={idx}
                                    className="inline-flex items-center gap-1 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 text-[10px] sm:text-xs font-medium"
                                  >
                                    <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                    {feature}
                                  </span>
                                ))}
                              </div>
                              
                              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                  <span className="text-muted-foreground text-xs sm:text-sm font-medium transition-colors duration-800">Quantity:</span>
                                  <div className="flex items-center gap-2">
                                    <motion.button
                                      whileHover={{ scale: item.quantity > 1 ? 1.1 : 1 }}
                                      whileTap={{ scale: item.quantity > 1 ? 0.9 : 1 }}
                                      onClick={() => updateQuantity(item.id, -1)}
                                      disabled={item.quantity <= 1}
                                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-foreground/5 border border-border text-foreground hover:bg-teal-500/20 hover:border-teal-500/30 transition-all flex items-center justify-center !min-h-0 !min-w-0 disabled:opacity-30 disabled:cursor-not-allowed"
                                    >
                                      <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                    </motion.button>
                                    
                                    <motion.span
                                      key={item.quantity}
                                      initial={{ scale: 1.2, color: '#14b8a6' }}
                                      animate={{ scale: 1, color: 'currentColor' }}
                                      className="text-foreground font-bold text-base sm:text-lg min-w-[1.5rem] sm:min-w-[2rem] text-center transition-colors duration-800"
                                    >
                                      {item.quantity}
                                    </motion.span>
                                    
                                    <motion.button
                                      whileHover={{ 
                                        scale: (item.name === 'Extra RAM' && item.quantity < 10) || 
                                               (item.name === 'Priority Support' && item.quantity < 1) ||
                                               (!['Extra RAM', 'Priority Support'].includes(item.name)) 
                                               ? 1.1 : 1 
                                      }}
                                      whileTap={{ 
                                        scale: (item.name === 'Extra RAM' && item.quantity < 10) || 
                                               (item.name === 'Priority Support' && item.quantity < 1) ||
                                               (!['Extra RAM', 'Priority Support'].includes(item.name)) 
                                               ? 0.9 : 1 
                                      }}
                                      onClick={() => updateQuantity(item.id, 1)}
                                      disabled={
                                        (item.name === 'Extra RAM' && item.quantity >= 10) ||
                                        (item.name === 'Priority Support' && item.quantity >= 1)
                                      }
                                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-foreground/5 border border-border text-foreground hover:bg-teal-500/20 hover:border-teal-500/30 transition-all flex items-center justify-center !min-h-0 !min-w-0 disabled:opacity-30 disabled:cursor-not-allowed"
                                    >
                                      <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                    </motion.button>
                                  </div>
                                </div>
                                
                                <div className="text-center sm:text-right">
                                  <div className="text-xl sm:text-2xl font-bold text-transparent bg-gradient-to-r from-teal-500 to-purple-500 bg-clip-text">
                                    ₹{(parseFloat(item.price.replace('₹', '').replace(',', '')) * item.quantity).toFixed(2)}
                                  </div>
                                  <div className="text-muted-foreground text-xs sm:text-sm transition-colors duration-800">
                                    ₹{item.price.replace('₹', '')} × {item.quantity}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>

              {/* Recommended Addons */}
              {cartItems.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="relative rounded-xl md:rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-transparent backdrop-blur-xl p-4 sm:p-6 transition-colors duration-800"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-foreground transition-colors duration-800">Boost Your Server</h3>
                      <p className="text-muted-foreground text-xs sm:text-sm transition-colors duration-800">Popular upgrades for better performance</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { name: 'Extra RAM', price: '₹20', icon: '🚀' },
                      { name: 'Priority Support', price: '₹30', icon: '⚡' },
                    ].map((addon, idx) => {
                      const isAdded = cartItems.some(item => item.name === addon.name);
                      return (
                        <button
                          key={idx}
                          onClick={() => !isAdded && addAddon(addon)}
                          disabled={isAdded}
                          className={clsx(
                            "p-3 sm:p-4 rounded-xl border transition-all text-left group !min-h-0 !min-w-0",
                            isAdded 
                              ? "bg-teal-500/10 border-teal-500/30 opacity-60 cursor-not-allowed" 
                              : "bg-foreground/5 border-border hover:border-purple-500/30 hover:bg-purple-500/10"
                          )}
                        >
                          <div className="flex justify-between items-start">
                            <div className="text-xl sm:text-2xl mb-2">{addon.icon}</div>
                            {isAdded && (
                              <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest bg-teal-500/10 px-2 py-0.5 rounded-full">Added</span>
                            )}
                          </div>
                          <div className="text-foreground font-semibold text-xs sm:text-sm mb-1 transition-colors duration-800">{addon.name}</div>
                          <div className={clsx(
                            "font-bold text-xs sm:text-sm transition-colors duration-800",
                            isAdded ? "text-teal-600 dark:text-teal-400" : "text-purple-600 dark:text-purple-400"
                          )}>{addon.price}/mo</div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Order Summary - Right Column */}
            {cartItems.length > 0 && (
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="lg:sticky lg:top-24 space-y-6"
                >
                  <div className="relative rounded-2xl md:rounded-3xl border border-border bg-card backdrop-blur-xl overflow-hidden transition-colors duration-800">
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
                        backgroundSize: '32px 32px'
                      }} />
                    </div>
                    
                    <div className="relative z-10 p-6 md:p-8">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl md:text-2xl font-bold text-foreground transition-colors duration-800">Order Summary</h3>
                        <div className="flex items-center gap-1 text-teal-600 dark:text-teal-400">
                          <Lock className="w-3.5 h-3.5 md:w-4 md:h-4" />
                          <span className="text-[10px] md:text-xs font-medium">Secure</span>
                        </div>
                      </div>
                      
                      <div className="space-y-3 sm:space-y-4 mb-6 pb-6 border-b border-border transition-colors duration-800">
                        <div className="flex justify-between text-sm sm:text-base text-foreground/80 transition-colors duration-800">
                          <span>Subtotal</span>
                          <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-baseline mb-6">
                        <span className="text-muted-foreground text-base md:text-lg transition-colors duration-800">Total Due</span>
                        <div className="text-right">
                          <motion.div
                            key={total}
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            className="text-3xl md:text-4xl font-bold text-transparent bg-gradient-to-r from-teal-500 to-purple-500 bg-clip-text"
                          >
                            ₹{total.toFixed(2)}
                          </motion.div>
                          <p className="text-muted-foreground/40 text-[10px] md:text-sm mt-1 transition-colors duration-800">per month</p>
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleCheckout}
                        disabled={isProcessing}
                        className="w-full group relative overflow-hidden rounded-xl py-4 bg-gradient-to-r from-teal-600 to-teal-500 text-white font-bold text-lg shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-teal-400 to-purple-400"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '100%' }}
                          transition={{ duration: 0.6, ease: "easeInOut" }}
                        />
                        
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {isProcessing ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                              />
                              Processing...
                            </>
                          ) : (
                            <>
                              <Zap className="w-5 h-5" />
                              Proceed to Checkout
                              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </>
                          )}
                        </span>
                      </motion.button>
                      
                      <div className="mt-6 pt-6 border-t border-white/10">
                        <div className="grid grid-cols-3 gap-4 text-center">
                          {[
                            { icon: '🔒', text: 'Secure Payment' },
                            { icon: '⚡', text: 'Instant Setup' },
                            { icon: '🎯', text: '24/7 Support' },
                          ].map((badge, idx) => (
                            <div key={idx} className="space-y-2">
                              <div className="text-2xl">{badge.icon}</div>
                              <p className="text-xs text-white/60 font-medium">{badge.text}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-6 pt-6 border-t border-white/10 text-center">
                        <p className="text-white/40 text-xs mb-2">Powered by</p>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                          <Lock className="w-4 h-4 text-teal-400" />
                          <span className="text-white font-semibold">Paymenter</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl p-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center">
                        <Lock className="w-5 h-5 text-teal-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">Secure Checkout</h4>
                        <p className="text-white/60 text-sm leading-relaxed">
                          Your payment information is encrypted and processed securely through Paymenter.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
